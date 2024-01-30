import mongoose from 'mongoose';

const connectToMongo = async () => {
    try {
        const connectionString = process.env.MONGO_URI!;
        
        await mongoose.connect(connectionString, {
            authSource: 'admin', 
          });        
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

export default connectToMongo;