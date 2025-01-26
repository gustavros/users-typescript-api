import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) { }

  async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      const { body } = httpRequest;

      if (!body) {
        return {
          statusCode: 400,
          body: 'Missing body'
        };
      }

      for (const field of requiredFields) {
        if (!body[field as keyof CreateUserParams]) {
          return {
            statusCode: 400,
            body: `Field ${field} is required`
          };
        }
      }

      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);

      if (!isEmailValid) {
        return {
          statusCode: 400,
          body: 'Invalid email'
        };
      }

      const user = await this.createUserRepository.createUser(body);

      return {
        statusCode: 201,
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