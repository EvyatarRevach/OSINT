import { Producer } from "kafkajs";

const sendKafkaMessage = async (producer: Producer, topic: string, message: string) => {
    try {

        return await producer.send({ topic, messages: [{ value: message }] });

    } catch (error) {
        return Promise.reject(error);
    }
}

export { sendKafkaMessage }