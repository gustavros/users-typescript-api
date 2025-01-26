import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse } from "../protocols";
import { IUpdateUserRepository, UpdateUserParams } from "./protocols";

export class UpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}

  async handle(httpRequest: HttpRequest<UpdateUserParams>): Promise<HttpResponse<User | string>> {
    try {
      const id = httpRequest.params.id;
      const body = httpRequest.body;

      if (!body) {
        return badRequest('Missing fields');
      }

      if (!id) {
        return badRequest('Missing user id');
      }

      const allowedParams: (keyof UpdateUserParams)[] = ['firstName', 'lastName', 'password'];
      const receivedParams = Object.keys(body);

      const isValidOperation = receivedParams.every(param => allowedParams.includes(param as keyof UpdateUserParams));

      if (!isValidOperation) {
        return badRequest('Invalid params');
      }

      const user = await this.updateUserRepository.updateUser(id, body);

      return ok(user);

    } catch {
      return serverError();
    }
  }
}