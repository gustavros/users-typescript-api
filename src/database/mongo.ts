import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    try {
      const url = process.env.MONGODB_URL || 'mongodb://localhost:27017';
      const username = process.env.MONGODB_USERNAME || 'root';
      const password = process.env.MONGODB_PASSWORD || 'password';

      const client = new Mongo(url, {
        auth: {
          username,
          password
        }
      });

      const db = client.db('users');

      this.client = client;
      this.db = db;

      // Create a collection to ensure the database is created
      await db.createCollection('exampleCollection');
    } catch (error) {
      console.error('Error trying to connect to MongoDB:', error);
      process.exit(1);
    }
  }
};