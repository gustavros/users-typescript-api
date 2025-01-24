import express from 'express';
import { config } from "dotenv"
import { GetUsersController } from './controllers/get-users/get-users';
import { MongoGetUsersRepository } from './repositories/get-users/mongo-get-users';
import { MongoClient } from './database/mongo';
import { MongoCreateUserRepository } from './repositories/create-user/mongo-create-user';
import { CreateUserController } from './controllers/create-user/create-user';

const main = async () => {
  config()
  const app = express();
  app.use(express.json());
  
  await MongoClient.connect();

  const port = process.env.PORT || 3000;

  app.get('/users', async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const { body, statusCode } = await getUsersController.handle();

    // observação: primeiro envia o status e depois o body
    res.status(statusCode).send(body);
  });

  app.post('/users', async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(mongoCreateUserRepository);

    // assim não funciona, pois o body é um objeto e não um HttpRequest
    // const { body, statusCode } = await createUserController.handle(req.body);

    // assim funciona, pois o body é um objeto e não um HttpRequest
    const { body, statusCode } = await createUserController.handle({ body: req.body });

    res.status(statusCode).send(body);
  });

  app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}

main();
