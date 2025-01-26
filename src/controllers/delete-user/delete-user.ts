import { User } from "../../models/user";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteUserRepository } from "./procotols";

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  
  async handle(HttpRequest: HttpRequest<{ id: string }>): Promise<HttpResponse<User>> {
    try {
       const id = HttpRequest?.params?.id;

       if (!id) {
         return {
           statusCode: 400,
           body: 'Missing user Id'
         };
       }

      const user = await this.deleteUserRepository.deleteUser(id);

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