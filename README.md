## Programação Web - TDE sobre Node.js e MongoDB
# Integrantes: Guilherme Ciello, Nathan Gowacki, Luiz Mocelin
O TDE consiste na criação de uma API utilizando o framework Express, Mongoose e Typescript e MongoDB como banco de dados. Na API é possível adicionar, pesquisar, atualizar e excluir dados de usuários (Nome, Email, Idade, Gênero, Telefone, CPF e RG). O CPF e o e-mail possuem validações através de funções que são testadas com a utilização do Jest, que é um framework de teste em Javascript.

## Configuração Inicial
1. Criar uma database no MongoDB Atlas.
2. Instalar as dependências do projeto:
```
npm install express
npm install mongodb
npm install mongoose
```
## Conexão com o Banco de Dados e Definição de Schema
```
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    idade: { type: Number, required: true },
    genero: { type: String, required: true },
    telefone: { type: String, required: true },
    cpf: { type: String, required: true },
    rg: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
```
## Rotas da API
```
import { Router } from 'express';
import { getUsers, getUser, createUser, deleteUser, updateUser } from '../services/users.js';

const router = Router();

router.get("/", async (request, response) => {
    const users = await getUsers();
    return response.status(200).send(users);
});

router.get("/:id", async (request, response) => {
    const user = await getUser(request.params.id);
    return response.status(200).send(user);
});

router.post("/", async (request, response) => {
    const params = request.body;
    const user = await createUser(params);
    return response.status(201).send(user);
});

router.delete("/:id", async (request, response) => {
    await deleteUser(request.params.id);
    return response.status(204).send();
});

router.put("/:id", async (request, response) => {
    const user = await updateUser(request.params.id, request.body);
    return response.status(200).send(user);
});

export default router;
```

Os Endpoints foram feitos usando a extensão do vs.code chamada Thunder Client.

## Exemplos de Utilização da API
1. Post
  URL: localhost:3000/users
```
  JSON:
{
  "nome": "Guilherme Attilio",
  "email": "guilhermeattilio@gmail.com",
  "idade": "22",
  "genero": "masculino",
  "telefone": "(54)99912-3469",
  "cpf": "099.419.280-02",
  "rg": "356322695"
}
```

3. Get all users
   URL: localhost:3000/users

4. Get one user by id(apresenta o resultado de um usuario como parâmetro o seu ID no banco de dados)
   URL: localhost:3000/users/663971303d78f2f8a00189af

5. Put(altera os dados de um usuário como parâmetro o seu ID no banco de dados)
   URL: localhost:3000/users/663971303d78f2f8a00189af
   JSON:
   ```
{
  "nome": "Novo nome",
  "email": "guilhermeattilio@gmail.com",
  "idade": "22",
  "genero": "masculino",
  "telefone": "(54)99912-3469",
  "cpf": "099.419.280-02",
  "rg": "356322695"
}
```

7. Delete(deleta os dados do usuário do banco de dados com base no seu id)
   URL: localhost:3000/users/663971303d78f2f8a00189af


## Testes Unitários
Para os testes unitários, foi usado o Jest, framework de testes em Javascript. A instalação foi feita através do comando:
npm install --save-dev jest

O arquivo de testes deve conter a extensão .test.js. Para exportar as funções testadas no arquivo de testes, foi usado o transcompilador Babel:
```
npm install --save-dev @babel/core @babel/preset-env babel-jest
```
Criado um arquivo .babelrc na raíz do projeto com o seguinte conteúdo:
```
{
    "presets": ["@babel/preset-env"]
}
```

Para rodar os testes é usado o comando:
```
  npm test
 ```

