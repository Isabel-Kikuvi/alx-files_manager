const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.client.on('error', (err) => console.error('Redis Client Error', err));
  }

  async isAlive() {
    try {
      await this.client.connect();
      return true;
    } catch (err) {
      console.error('Redis connection failed:', err);
      return false;
    }
  }

  async get(key) {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error('Redis get error:', err);
      return null;
    }
  }

  async set(key, value, duration) {
    try {
      return await this.client.set(key, value, 'EX', duration);
    } catch (err) {
      console.error('Redis set error:', err);
      return false;
    }
  }

  async del(key) {
    try {
      return await this.client.del(key);
    } catch (err) {
      console.error('Redis del error:', err);
      return false;
    }
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
