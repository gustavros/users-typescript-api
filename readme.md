# Users TypeScript API

Este projeto é uma API de usuários desenvolvida em TypeScript. A API permite a criação, leitura, atualização e exclusão de usuários.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- MongoDB

## Instalação

1. Clone o repositório:
  ```bash
  git clone https://github.com/seu-usuario/users-typescript-api.git
  ```
2. Navegue até o diretório do projeto:
  ```bash
  cd users-typescript-api
  ```
3. Instale as dependências:
  ```bash
  npm install
  ```

## Configuração

1. Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:
  ```
  MONGO_URI=<sua-string-de-conexão-mongodb>
  PORT=3000
  ```

## Uso

1. Inicie o servidor:
  ```bash
  npm start
  ```
2. Acesse a API em `http://localhost:3000`.

## Endpoints

- `GET /users` - Retorna todos os usuários
- `GET /users/:id` - Retorna um usuário pelo ID
- `POST /users` - Cria um novo usuário
- `PUT /users/:id` - Atualiza um usuário pelo ID
- `DELETE /users/:id` - Deleta um usuário pelo ID

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.