import { error, log } from "console";
import connectToMongo from "./configs/connectToMongo";
import kafka from "./configs/kafka";
import { connectToRedis, redis } from "./configs/redis";
import { addKyeWord, updateDetails } from "./dal/mongoDal";
import newsModel from "./models/newsModel";
import { searchGoogle } from "./utils/google";
import 'dotenv/config'
const consumer = kafka.consumer({ groupId: 'process_da' });

const processData = async () => {

    await connectToMongo()
    await connectToRedis()
    await consumer.subscribe({ topic: 'processed_messages', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try {
                const valueString = message.value instanceof Buffer
                    ? message.value.toString('utf-8')
                    : '';
                const value = JSON.parse(valueString);
                console.log(`Received message from topic ${topic}, partition ${partition}:`, value);

                for (const textArray of value) {
                    const kyeWord:string = textArray[0];
                    await addKyeWord(kyeWord);
                    const enrichedInformation = await searchGoogle(kyeWord);
                    if(enrichedInformation&& enrichedInformation.postCount){
                        const data = JSON.stringify(enrichedInformation)
                        await redis.json.set('NX', '$', data);
                        await redis.expire(data, 24 * 60 * 60);
                    }
                   throw new Error('')
                }
            } catch (error) {
                console.error("Failed to process missile data", error);
            }
        },
    });
};


processData();
