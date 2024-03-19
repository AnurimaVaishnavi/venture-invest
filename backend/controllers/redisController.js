import { createClient } from 'redis';

const redisclient = createClient();

redisclient.on('error', err => console.log('Redis Client Error', err));

await redisclient.connect();
console.log("Redis client connected!!");

export{redisclient};