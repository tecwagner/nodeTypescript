# Projeto Desenvolvimento Node e TypeScript

- Node.js
- TypeScript
- Express
- Banco de Dados Postgres
- TypeORM

## Primeiros comandos.

- criar um repositorio no github

- yarn init: para criar o package.json

- yarn add typescript -D : instalar o typescript de dependencia de desenvolvimento, por que é utilizado somente para desenvolver.

- Para iniciar um projeto desenvolvido em typesript é executado o comando: yarn tsc --init

- Em seguida será criado um arquivo tsconfig.json

  - Dentro do arquivo tsconfig.json, desabililte o "strict": para false,

- O Node não compreende o typescript é preciso conventer para javascript.

  - Atraves do comando: yarn tsc.

  - Que vai gerar um arquivo em javascript.

  - Em seguida execute o comando: node index.js para testar a conversão.

- Nessa aplicação será utilizado o servidor Express.

  - Instalar o express na aplicação: yarn add express

  - Criar a pasta SRC > server.ts

  - Dentro do arquivo server criado foi importado o express para utilizar a dependencias.

  - Quando o import apresentar "..." deve instalar as typagem.

  - yarn add @types/express -D

- Para executar o server de uma forma mais rapida será instalado.

  - yarn add ts-node-dev -D

  - Ele irá receber nosso codigo e converter para javascript.

  - Apos a instalação, configure o package.json.

    - criando uma tag "Scripts": { " dev " : "ts-node-dev src/server.ts" }

    - sempre que ouver atualização na aplicação o server atualiza automatico.

# Tipos de Metodos

- GET => Buscar informação
- POST => Inserir (Criar) uma informação
- PUT => Alterar uma informação
- DELETE => Remover um dado
- PATCH => Alterar uma informação especifica

- REQUEST => Entrando
- RESPONSE => Saindo
- NEXT => Proximo

# Arquitetura da Base de Dados

- https://whimsical.com/nlw-valoriza-FWsg6CjBwCXL4V8igqGR9T

# Tipos de Parametros

- Routes Params => http://localhost:3333/produtos/7895463254

  - busca por :id

- Query Params => http://localhost:3333/produtos?name=teclado&description=otimo

  - busca por descrição, quando ouver mais de um parametro na rota é preciso separar por '&'.

- Body Params => {

  - "name": "teclado",
  - "description": "teclado otimo"
    }
  - Paramentros que vem no corpo da requisição.

  - É utilizado por Post, Push e não por Get.

# Instalação do Framework de BD

- Documentação: https://typeorm.io/#/

- Install o yarn package:

  - yarn add typeorm --save

- You need to install reflect-metadata shim:

  - yarn add reflect-metadata --save

- import na server.ts:

  - import "reflect-metadata";

- MySQL or CockroachDB

- yarn add mssql --save

- yarn add mysql --save

- Criar um arquivo na raiz do projeto.

  - Crie uma pasta em SRC > database > index.ts

  - dentro dessa pasta cria conexão de banco de dados. Para bancos relacionais não é necessário criação da index

  - import a pasta database, para a pasta server.ts

  - ormconfig.json

    - "cli": {
      "migrationsDir": "src/database/migrations",
      "entitiesDir": "src/entities"
      }

  - No arquivo package.json

    - adicione o Scripts: {"typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"}

  - Para teste do scripts execute o comando: yarn typeorm -help

  - com as configurações do banco de dados escolhido

- Para criação de migrations

  - Execute esse comando que cria a migration

    - yarn typeorm migration:create -n <Nome da tabela>

    - para criar a micrations na base de dados: yarn typeorm migration:run  

    - Criar a estrutura da tabela dentro da migrations criada

    - Se precisar reverter a ultima migrations

      - exe: yarn typeorm migration:reverte

- Para criar as entidades do Typeorm

  - É preciso editar nosso arquivo ormconfig.json e adicionar o caminho onde será criado as entities

  - https://typeorm.io/#/entities

  - edicione: "entities": [
    "src/entities/*.ts"
    ],

  - Em seguida execute o comando: yarn typeorm entity:create -n <Nome do Tabela>

  - Dentro de cli { "entitiesDir": "src/entities" }

  - Ao criar sua entidade informe o nome da sua tabela em exemplo: @Entity("users")

  - Instalar o yarn add uuid, para gerar id unico.

  - Instalar as typagem: yarn add @types/uuid -D

- Criar um Repositorio.

  - O respositorio da aplicação será a camada que irá fazer a comunicação com a controller e entities.

  - < Entity > (User) <-> ORM <-> BD = Repositorios

  - https://typeorm.io/#/custom-repository

  - Repositoro pesonalisado.

  - O Extends permite que seja extendido metodos de outra classe.

  - Temos Interface implements.

  - Qual é a diferença entre eles?

    - Quando utilizo extends já tenho os metodos por padrão, para ser utilizado.

    - O Implements pode ser manipulado e deve ser importado.

- Criar Services

  - Arquitetura do Services.

  - Server -> ( ) -> SERVICES -> REPOSITORIES -> BD

  - Server -> Controller -> Services (request, response, next)

- Criar Controllers
