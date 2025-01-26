import { User } from "../../models/user";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./procotols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  
  async handle(HttpRequest: HttpRequest<{ id: string }>): Promise<HttpResponse<User | string>> {
    try {
       const id = HttpRequest?.params?.id;

       if (!id) {
         return badRequest('Missing user id');
       }

      const user = await this.deleteUserRepository.deleteUser(id);

       return ok(user);
    } catch {
      return serverError();
    }
  }
}