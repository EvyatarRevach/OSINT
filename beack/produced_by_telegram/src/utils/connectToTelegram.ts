import prompts from "prompts";
import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";



const apiId = 27025290;
const apiHash = "fb096a4c26476906fb47ef8c97c69fea";
const stringSession = new StringSession('1BAAOMTQ5LjE1NC4xNjcuOTEAUKM5mFO/YDhQfTk9wCn3uJIsg5m6kslXeB7uAmmXQ5ZNzRCejS1KL7uA73uKGl6/gUq2XSxAjMNlFbLWNMqNOuSjsVdBXZnlta1dPDKDHbJH4dCnFPlTqxjj5C0ZKsBiyqcAXTdkW8DVjosEoSC2mtTNDIKn18fB4giNuPVZnmOE5Xt8tfnY+817LSms62d4VLhFZaNu9L083KtCenyalLNG7Znt/yvVh0+bMRJ6katvcKpc9G9PKMs/oO43qA6db77bbCc2uPY1Sk+HT4j8O0ppV5rUVb0NuKutWzt7IhELi2+ztDdgPW7EJpJCnDRLs9t/TzGGgqIfz9JoV5Sw3yA=');



export const connectToTelegram = async () =>{
    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
      });
      await client.start({
        phoneNumber: "972548538851",
        phoneCode: async () => {
          const response = await prompts({
            type: 'text',
            name: 'code',
            // message: 'What is the meaning of life?'
          });
          return response.code
    
        },
        onError: (err) => console.log(err)
      });
      console.log("You should now be connected.");
      // console.log(client.session.save());
      return client
}