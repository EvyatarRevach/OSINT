import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from 'dotenv';
import SearchResult from "../types/SearchResult";
dotenv.config()

const MODEL_NAME = "gemini-pro";
const API_KEY_GEMINI = process.env.API_KEY_GEMINI || "AIzaSyBPt7bzY4EFcsDY1gN9nUFQ4XA_MU-o60E";

export async function searchLocation(text: string) {
    const genAI = new GoogleGenerativeAI(API_KEY_GEMINI);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    const parts = [
        { text: `I want you to recognize the name of the country and the name of the city from the text I send and return to me the name of the country and the name of the city, and the coordinates of the city, and all the parameters will be separated by ",", and the last position will be the coordinates of the city, or of the country if you cannot identify a city And if there is no country that you recognize, give the location of an area
        It doesn't have to be that a place is mentioned explicitly, try to find it according to the context, from this text -"${text}"  ` },
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });

    const response = result.response.text().split(",");
    return response
}


const a = `[
    {
     title: 'פיצוץ על הכביש - והימלטות ברוורס | תיעוד: צה"ל בגל תקיפות בדרום לבנון',
     link: 'https://www.ynet.co.il/news/article/ryfgcf4da',
     snippet: 'בתיעוד ממכונית נוסעת שפרסם כתב רשת "אל-מנאר" נראה פיצוץ בכביש בדרום המדינה. קודם לכן דווח על שורת תקיפות ישראליות, דובר צה"ל מסר כי חיל...',
     date: '1 month ago',
     source: 'ynet',
     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG6SE42KnkxyJzuUJWKeIH55GQpzNMzDcZt05qCUoNRctNYXL0r4dZFI5W-Q&s',
     position: 1
    },
    {
     title: 'סגן מנהיג חמאס סאלח אל-עארורי חוסל בפיצוץ בביירות | צפו בתיעוד',
     link: 'https://www.maariv.co.il/news/military/Article-1064713',
     snippet: 'בלבנון אישרו כי עקב פיצוץ כטב"מ, חוסל סגן מנהיג ארגון הטרור ועוזרו של איסמעיל הנייה - סאלח אל-עארורי. לפי הדיווחים, הוא חוסל יחד עם שניים...',
     date: '2 weeks ago',
     source: 'מעריב',
     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMBbs29NPNlzfqfaTVzdY9RPageEQNhhSFZunvY7tJo2nXEU6b9O-tsYZaXw&s',
     position: 2
    },
    {
     title: 'דובר צה"ל: "חיזבאללה מסכן את אדמת לבנון - נגיב לכל אירוע טרור"',
     link: 'https://www.globes.co.il/news/article.aspx?did=1001464809',
     snippet: 'דיווח: צה"ל החל להציף את מנהרות חמאס במי ים ○ הותר לפרסום: צה"ל חילץ את גופותיהם של עדן זכריה ורס"ב זיו דדו, שנחטפו לעזה; בפעילות לחילוץ...',
     date: '1 month ago',
     source: 'גלובס',
     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj9utj82Zvdo6rzDDkUaY2VBNnT24Zg6-acyo70oWHAS0d8_mezDAjJwSFlg&s',
     position: 3
    },
    {
     title: 'פיצוץ בלבנון: מי שלח מסר למתווך הלא רשמי של חיזבאללה?',
     link: 'https://www.makorrishon.co.il/opinion/719431/',
     snippet: 'התקשורת הלבנונית התמלאה בדיווחים, לפיהם הגנרל עבאס איברהים נהרג בעת הפצצה של ביתו בכפר קוטריה, אך מקורביו הכחישו. כך או כך, נראה שהגנרל,...',
     date: '2 weeks ago',
     source: 'מקור ראשון',
     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHw6tw4hJIvuVUGw75r4o6EbKmT7TN4h-dYE1vicJy_bdDOum5S2EPz5s19Q&s',
     position: 4
    }
   ]`
searchLocation(a)