import { User } from "../../models/user";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest.body;

      if (!body) {
        return {
          statusCode: 400,
          body: 'Missing body'
        };
      }

      if (!id) {
        return {
          statusCode: 400,
          body: 'Missing param: id'
        };
      }

      const allowedParams: (keyof UpdateUserParams)[] = ['firstName', 'lastName', 'password'];
      const receivedParams = Object.keys(body);

      const isValidOperation = receivedParams.every(param => allowedParams.includes(param as keyof UpdateUserParams));

      if (!isValidOperation) {
        return {
          statusCode: 400,
          body: 'Invalid params'
        };
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return {
        statusCode: 200,
        body: user
      };

    } catch {
      return {
        statusCode: 500,
        body: 'Internal server error'
      };
    }
  }
}