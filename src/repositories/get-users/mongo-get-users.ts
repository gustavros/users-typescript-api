import { IGetUsersRepository } from "../../controllers/get-users/protocols";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers() {
    return [
      {
        email: 'gustavossw@hotmail.comm',
        firstName: 'gustavo',
        lastName: 'santana',
        password: '123456',
      }
    ]
  }
}