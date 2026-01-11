import Queue from 'bull';

// - Bull Queue System
// Bull is a Node.js library that provides a robust job/queue system built on Redis. It handles job scheduling, retries, concurrency, and more.
// - ioredis Role
// Bull (and its successor BullMQ) rely on ioredis as the Redis client. All queue operations — adding jobs, processing jobs, listening for events — are done via ioredis connections.
// - 
import redisConfig from '../config/redisConfig.js'
export default new Queue('mailQueue', {
    redis: redisConfig
});