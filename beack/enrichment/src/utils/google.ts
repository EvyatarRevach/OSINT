// import cheerio from 'cheerio';
import axios, { AxiosResponse } from 'axios';
import 'dotenv/config';
import SearchResult from '../types/SearchResult';
import { searchLocation } from './searchLocation';
import { updateDetails } from '../dal/mongoDal';
import SearchGoogle from '../types/SearchGoogle';

const X_API_KEY = process.env.X_API_KEY || "9bbff55fc98e02247244fc9e4a17c807ea7d8b0b";


export const searchGoogle = async (kyeWord: string): Promise<SearchGoogle|undefined> => {
    try {
        const data = JSON.stringify({ "q": kyeWord });
        const config = {
            method: 'post',
            url: 'https://google.serper.dev/news',
            headers: {
                'X-API-KEY': X_API_KEY,
                'Content-Type': 'application/json'
            },
            data: data
        };
        const response: AxiosResponse = await axios(config);
        const results = response.data.news;
        // log(results)
        if (results === undefined) {
            throw new Error("Error searching results");
        }

        let postCount = 0;
        let textLocation = ''
        const posts: SearchResult[] = [];

        results.forEach((result: SearchResult) => {
            const timestamp = result.date;

            if ((!timestamp.includes("month") && !timestamp.includes("year"))  ||timestamp.includes("day") ) {
                posts.push(result);
                textLocation += result.title , result.snippet
                postCount++;
            }
        });

        if (postCount > 0) {
            const location = await searchLocation(textLocation);

            await updateDetails(kyeWord, location, postCount,results)

            return {
                postCount,
                results: posts,
                location,
                kyeWord

            };

        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
