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

      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.error('Error trying to connect to MongoDB:', error);
      process.exit(1);
    }
  }
};