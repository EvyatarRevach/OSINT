import moment from "moment";
import newsModel from "../models/newsModel";
import SearchResult from "../types/SearchResult";


export const addKyeWord = async (kyeWord: string) => {
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');

    const dateObject = moment(date, "MMMM Do YYYY, h:mm:ss a").toDate();

    const newNews = { kyeWords: kyeWord, articles: [], newsTime: dateObject };

    const existingNews = await newsModel.findOne({ kyeWords: kyeWord });

    if (existingNews) {
        await newsModel.findOneAndUpdate(
            { kyeWords: kyeWord },
            { $set: { newsTime: dateObject } }
        );
    } else {
        await newsModel.create(newNews);
    }
}



export const updateDetails = async (kyeWord: string, location: string[], postCount: number, results: SearchResult[]) => {
    try {
        await newsModel.findOneAndUpdate(
            { kyeWords: kyeWord },
            {
                $push: {
                    articles: {
                        $each: results, 
                    },
                },
                location: location,
                postCount: postCount,
            },
            { new: true } 
        );
        console.log(`Details updated for kyeWords: ${kyeWord}`);
    } catch (error) {
        console.error(`Failed to update details for kyeWords: ${kyeWord}`, error);
        throw error;
    }
};
