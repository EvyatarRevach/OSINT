import { createClient } from 'redis';

const redis = createClient({
    socket:
    {
        port: 6379,
        host: '127.0.0.1'
    }
});

const connectToRedis = async () => {
    try {
        console.log('Trying to connect to Redis...');
        await redis.connect();
        console.log('Connected to Redis');
    } catch (error) {
        console.error('Error connecting to Redis:', error);
    }
};

export {connectToRedis, redis}