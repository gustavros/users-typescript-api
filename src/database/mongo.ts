import { MongoClient as Mongo, Db } from "mongodb"

export const MongoClient = {
  client: undefined as Mongo | undefined,
  db: undefined as Db | undefined,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL || 'localhost:27017';
    const username = process.env.MONGODB_USERNAME || 'root';
    const password = process.env.MONGODB_PASSWORD || 'password'


    const client = new Mongo(url, {
      auth: {
        username,
        password
      }
    });
    const db = client.db('users');

    this.client = client;
    this.db = db;

    console.log('Connected to MongoDB');
  }
}