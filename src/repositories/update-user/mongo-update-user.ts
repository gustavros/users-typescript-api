import { ObjectId } from "mongodb";
import { IUpdateUserRepository, UpdateUserParams } from "../../controllers/update-user/update-user";
import { MongoClient } from "../../database/mongo";
import { User } from "../../models/user";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(id: string, params: UpdateUserParams): Promise<User> {
    try {
      await MongoClient.db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            ...params
          }
        }
      );

      const user = await MongoClient.db.collection<Omit<User, 'id'>>('users').findOne({ _id: new ObjectId(id) });

      if (!user) {
        throw new Error('User not found');
      }

      return {
        id: user._id.toHexString(),
        ...user
      };
    } catch {
      throw new Error('Internal server error');
    }
  }
}
