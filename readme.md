## Smile Sphere - API 🚀

<div align="center">

  ![Static Badge](https://img.shields.io/badge/Node-0A9047?style=for-the-badge&logo=node.js&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/typescript-0B88F7?style=for-the-badge&logo=typescript&logoColor=0B88F7&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/prisma-063E7C?style=for-the-badge&logo=prisma&logoColor=white&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/MySQL-0B7FAA?style=for-the-badge&logo=mysql&logoColor=%23000&labelColor=orange)
  ![Static Badge](https://img.shields.io/badge/ZOD-0822A2?style=for-the-badge&logo=zod&logoColor=%23000&labelColor=1481FC)
  ![Static Badge](https://img.shields.io/badge/dotenv-D0D302?style=for-the-badge&logo=.env&logoColor=D0D302&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/npm-CA3337?style=for-the-badge&logo=yarn&logoColor=white&labelColor=000)

</div>

Este projeto é uma API desenvolvida utilizando **[Node](https://nodejs.org/en), [Fastify](https://fastify.dev/), [Typescript](https://www.typescriptlang.org/), [Prisma](https://www.prisma.io/), [ZOD](https://zod.dev/) and [MySQL](https://www.mysql.com/) como Banco de dados.** 

A Aplicação simula às funcionalidades de uma Clínica de Dentista. Usuários podem registrar agendamentos, cadastrar Doutores ou Pacientes. Está sendo implementado diversas outras funcionalidades (controle de estoque, dashboard para acompanhamento, controle de equipamentos e etc).

#### Tabela de conteúdo

- [Instalação](#instalação)
- [Usabilidade](#usabilidade)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Database](#database)

#### Instalação

1. Clone o repositório:

    - `git clone https://github.com/genari-j/smile-sphere-api.git`

2. Instale as dependências com npm

    - `npm i`

3. Crie um Banco de Dados em sua máquina

    - Recomendável (MySQL)
    - Esteja ciente que o serviço de db esteja rodando
    - O projeto está rodando com `Prisma` e caso queira alterar o serviço de Banco, é necessário alterar o provider para o arquivo `schema.prisma`

4. Configurando Variáveis de Ambiente

    - Note que há um arquivo .env.example na raiz
    - Apenas crie outro arquivo na raiz com o nome `.env` preenchendo as variáveis do .env.example

5. Rode as migrações e as Seeds apontando para o DB criado

    - Aplicando migrações -> `npx prisma migrate dev`
    - Populando o DB com seeds -> `npx prisma db seed`

#### Usabilidade

1. Inicie a aplicação com npm -> `npm run dev`

2. A API ficará acessível em -> `http://localhost:3002/`
    - Caso tenha colocado outra porta, apenas altere `3002` para sua porta;

#### API Endpoints
A API fornece os seguintes Endpoints:

#### BASE API URL:

| Endpoint                    | HTTP Method           | Description                      |
| --------------------------- | --------------------- | -------------------------------- |
| /                           | GET                   | Check if API is running          |

#### Users:

| Endpoint                    | HTTP Method           | Description                      |
| --------------------------- | --------------------- | -------------------------------- |
| /users                      | GET                   | Get all users                    |
| /users/:id                  | GET                   | Get user by id                   |
| /signin                     | POST                  | Logging in                       |
| /signup                     | POST                  | Create user                      |
| /users/:id                  | PUT                   | Update user                      |
| /users/:id                  | DELETE                | Disable user                     |
| /verify-token               | GET                   | Verify token to reset password   |
| /password/recovery          | POST                  | Solicitation to reset password   |
| /password/recovery/set-new  | PATCH                 | Confirm new password by recovery |
| /password/user/:id/set-new  | PATCH                 | Update user password by logged   |

#### Patients:

| Endpoint              | HTTP Method           | Description                    |
| --------------------- | --------------------- | ------------------------------ |
| /patients             | GET                   | Get all patients               |

#### Items:

| Endpoint              | HTTP Method           | Description                    |
| --------------------- | --------------------- | ------------------------------ |
| /items                | GET                   | Get all items                  |

#### Doctors:

| Endpoint              | HTTP Method           | Description                    |
| --------------------- | --------------------- | ------------------------------ |
| /doctors              | GET                   | Get all doctors                |

#### Appointments Status:

| Endpoint              | HTTP Method           | Description                    |
| --------------------- | --------------------- | ------------------------------ |
| /appointments-status  | GET                   | Get all appointments status    |

#### Appointments Summary:

| Endpoint              | HTTP Method           | Description                    |
| --------------------- | --------------------- | ------------------------------ |
| /appointments-summary | GET                   | Generate a simple Dashboard   |

#### Appointments:

| Endpoint              | HTTP Method           | Description                    |
| --------------------- | --------------------- | ------------------------------ |
| /appointments         | GET                   | Get all appointments           |

#### Autenticação
O sistema está lidando com permissões de usuários. Ao criar um usuário, é definido também o nível de permissão. Dependendo do nível de rotas sendo acessadas, apenas níveis de ADMIN/GESTOR estão autorizados. Utilize o acesso `MHT51F - Login`, `123456 - Senha` (gerado pela própria seed de usuários), para acessar a aplicação.

  - `ADMIN` -> Consegue realizar todas operações do sistema;
  - `GESTOR` -> Consegue realizar parte das operações;
  - `FUNCIONÁRIO` -> Consegue realizar somente atividades de leitura;

#### Database
É recomendável utilizar o [MySQL](https://www.mysql.com/) como Banco de Dados. Abaixo está listado novamente os comandos para lidar com Migrações e Seeds.

  - Aplicando migrações -> `npx prisma migrate dev`
  - Populando o DB com seeds -> `npx prisma db seed`
  - O projeto está está utilizando [Prisma](https://www.prisma.io/) e caso queira alterar o serviço de Banco, é necessário alterar também o provider no arquivo `schema.prisma`