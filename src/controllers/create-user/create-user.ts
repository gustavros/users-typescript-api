import { User } from "../../models/user";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateUserParams, ICreateUserRepository } from "./protocols";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) { }

  async handle(httpRequest: HttpRequest<CreateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      const { body } = httpRequest;

      if (!body) {
        return badRequest('Missing body');
      }

      for (const field of requiredFields) {
        if (!body[field as keyof CreateUserParams]) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email);

      if (!isEmailValid) {
        badRequest('Invalid email');
      }

      const user = await this.createUserRepository.createUser(body);

      return created(user);
    } catch {
      return serverError();
    }
  }
}