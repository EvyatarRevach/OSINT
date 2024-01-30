import mongoose from "mongoose";

const SearchResult = new mongoose.Schema({
    title: String,
    link: String,
    snippet: String,
    date: String,
    source: String,
    imageUrl: String,
    position: Number,
})
const newsSchema = new mongoose.Schema(
    {
        kyeWords: String,
        newsTime: Date,
        articles: [SearchResult],
        location:[String],
        postCount:Number
    },
    {
        strict: true,
    }
);

const newsModel = mongoose.model('news', newsSchema);

export default newsModel;
