import newsModel from "../models/newsModel";
import SearchResult from "../types/SearchResult";

export const getAllDetails = async () => {
    try {
        const allDetails = await newsModel.find({});        
        return allDetails;
    } catch (error) {
        console.error("Failed to fetch all details", error);
        throw error;
    }
};

export const getDetailsWithPosts = async () => {
    try {
        const detailsWithPosts = await newsModel.find({ postCount: { $gt: 0 } });
        return detailsWithPosts;
    } catch (error) {
        console.error("Failed to fetch details with posts", error);
        throw error;
    }
};


export const getDetailsWithoutPosts = async () => {
    try {
        const detailsWithoutPosts = await newsModel.find({ postCount: { $exists: false } });
        return detailsWithoutPosts;
    } catch (error) {
        console.error("Failed to fetch details without posts", error);
        throw error;
    }
};
