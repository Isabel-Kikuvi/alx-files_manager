const { MongoClient } = require('mongodb');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';

class DBClient {
  constructor() {
    this.client = null;
    this.url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
  }

  async connect() {
    try {
      this.client = await MongoClient.connect(this.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  }

  isAlive() {
    return this.client?.isConnected();
  }

  async nbUsers() {
    if (!this.client) {
      throw new Error('Not connected to MongoDB');
    }
    const collection = this.client.db().collection('users');
    const count = await collection.countDocuments({});
    return count;
  }

  async nbFiles() {
    if (!this.client) {
      throw new Error('Not connected to MongoDB');
    }
    const collection = this.client.db().collection('files');
    const count = await collection.countDocuments({});
    return count;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
