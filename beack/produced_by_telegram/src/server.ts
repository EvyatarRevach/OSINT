import { NewMessage, NewMessageEvent } from "telegram/events";
import { sendKafkaMessage } from "./configs/kafkaProducer";
import { producer } from "./configs/producer";
import moment from "moment";
import { log } from "console";
import { connectToTelegram } from "./utils/connectToTelegram";
import bigInt from 'big-integer';
const specificChannelIds = [ 1001310691, 1199627330, 1446968422, 1484881482, 1342302794,1143765178, 1192694517 ,1155218100];
import dotenv from "dotenv";


(async () => {
  await producer.connect();
  console.log('producer connect');
  const client = await connectToTelegram();

  async function handleSpecificChannelMessages(event: NewMessageEvent) {
    log(event, '\n event');

    if (event.message.chatId && event.message.peerId && event.message.message.length  > 0) {
      if ('channelId' in event.message.peerId) {

        const channelId: bigInt.BigInteger = event.message.peerId.channelId;
        const channelIdNumber: number = Number(channelId.toString()); 
        log(channelIdNumber, '\n channelIdNumber');

        if (specificChannelIds.includes(Number(channelId))) {
          const chatIdNumber: number = Number(channelId);
          const formattedTime = moment().format('MMMM Do YYYY, h:mm:ss a');
          
          const data = {
            message: event.message.message,
            chatId: chatIdNumber,
            timestamp: formattedTime,
          };

          log(data);

          await sendKafkaMessage(producer, 'message_from_telegram', JSON.stringify(data));
          
          log('the message sent to kafka');
        }
      } 
    }
  }

  client.addEventHandler(handleSpecificChannelMessages, new NewMessage({}));
  //   await client.sendMessage("me", { message: "Hello!" });
  // async function handler(event: NewMessageEvent) {
  //   if(event.isChannel){
  //       console.log("[newmessage from any chanel]", event);
  //       console.log('id',event.message.CONSTRUCTOR_ID);
  //   }
  // }

  // client.addEventHandler(handler, new NewMessage({}));
})();
