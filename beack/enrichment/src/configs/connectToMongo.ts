import mongoose from 'mongoose';
import newsModel from '../models/newsModel.js'; 

const connectToMongo = async () => {
    try {
        const connectionString = process.env.MONGO_URI!;
        
        await mongoose.connect(connectionString, {
            authSource: 'admin', 
          });        
        const order = new newsModel(); 
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectToMongo;