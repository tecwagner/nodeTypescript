# Regras do Projeto

- Cadastro de Usuário

  [] Não é permitido cadastrar mais de um usuário com o mesmo e-mail
  [] Não é permitido cadastrar usuário sem email

- Cadastro de Tag

  [] Não é permitido cadastrar mais de uma tag com o mesmo nome
  [] Não é permitido cadastrar tag sem nome
  [] Não é permitido o cadastro por usuário que não seja ADM

- Cadastro de Elogios

  [] Não é permitido um usuário cadastrar um elogio para si mesmo
  [] Não é permitido cadastrar elogios para usuários invalidos
  [] O usuário precisa está autenticado na aplicação

# Projeto Desenvolvimento em Node.js com TypeScript

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

- Prisma / Knex / ORM

- Install o yarn package:

  - yarn add pg --save

  - yarn add typeorm --save

- You need to install reflect-metadata shim:

  - yarn add reflect-metadata --save

- import na server.ts:

  - import "reflect-metadata";

- MySQL or CockroachDB

- yarn add mssql --save

- yarn add mysql --save

- Postgres or CockroachDB

- yarn add pg --save

- Criar um arquivo na raiz do projeto.

  - Crie uma pasta em SRC > database > index.ts

  - dentro dessa pasta cria conexão de banco de dados. Para bancos relacionais não é necessário criação da index

  - import a pasta ./database, para a pasta server.ts

  - Criar o arquivo na raiz do projeto ormconfig.json

  - Com as configurações do banco de dados escolhido

- Para criação de migrations controle de alteração e criação de tabelas

  - Quando sua aplicação estiver pronta a migration é responsavel por criar todas as tabelas.

  - O CLI do typeORM é para definir o caminho da pasta que será criado as migrations

  - Documentação: https://typeorm.io/#/migrations

  - "cli": {
    "migrationsDir": "src/database/migrations",
    "entitiesDir": "src/entities"
    }

  - No arquivo package.json

    - adicione o Scripts: {"typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"}

    - Para teste do scripts execute o comando: yarn typeorm -help

      - Mostra as opções para utilizar

  - Execute esse comando que cria a migration

    - yarn typeorm migration:create -n CreateUsers <Nome da tabela>

      - Será criado dois metodos primeiro: uo, uma para definir os campos da tabela.

        - Criar os campos da tabela e relacionamentos.

      - Segundo metodo: down, é Deletar os registro da tabela.

    - Diretorio para criar as tabelas do banco.

      - No arquivo: ormconfig.json é criado a parametrização de migrations.

        - "migrations": ["src/database/migrations/*.ts"],

    - Para criar a micrations na base de dados execute o: yarn typeorm migration:run

      - Após a execusão da linha de comando informada acima o banco de dados cria uma tabela de migrations com registro da criação da tabela.

    - Criar a estrutura da tabela dentro da migrations criada

    - Se precisar removerter a ultima migrations

      - Execute o comando: yarn typeorm migration:revert

      - Que será removido a ultima migrations criada.

    - Para adicionar uma nova coluna na tabela de banco de dados, com typeORM.

      - execute o comando: yarn typeorm migration:create -n AlterUserAddPassword
        - Em seguida será criado um arquivo em: src/database/migrations/AlterUserAddPassword
        - Neste arquivo deve ser implementado a coluna adional, passando nome, tipo.
        - Depois de definido os dados da coluna execute o comando para rodar a migration: yarn typeorm migration:run

- Para criar as entidades do Typeorm

  - É preciso editar nosso arquivo ormconfig.json e adicionar o caminho onde será criado as entities

  - https://typeorm.io/#/entities

  - edicione:
    "entities": [
    "src/entities/*.ts"
    ],

  - Em seguida execute o comando: yarn typeorm entity:create -n User <Nome do Tabela>

  - Dentro de cli { "entitiesDir": "src/entities" }

  - Ao criar sua entidade informe o nome da sua tabela em exemplo: @Entity("users")

  - Instalar o yarn add uuid, para gerar id unico.

  - Instalar as typagem: yarn add @types/uuid -D

  - No arquivo: tsconfig.json, descomente duas linhas.

    - "experimentalDecorators": true
    - "emitDecoratorMetadata": true
    - "strictPropertyInitialization": false - Para que não apresente erro ao adicionar atributos na tabela de entities, informando que não foram inicializada.

  - Criar os campos da tabela dentro do arquivo entities.ts

    - Tabela de exempĺo: User.ts

- Criar um Repositorio.

  - O respositorio da aplicação será a camada que irá fazer a comunicação com a controller e entities.

  - < Entity > (User) <-> ORM <-> BD (User.ts) = Repositorios

  - https://typeorm.io/#/custom-repository

  - Repositoro customizado.

    - Dentro dele podemos tratar metodos de erros.

  - O Extends permite que seja extendido metodos do Repository e o tipo, Repository<User> de outra classe que por padrão já existe.

  - Temos Interface implements.

  - Qual é a diferença entre eles?

    - Quando utilizo extends já tenho os metodos por padrão, para ser utilizado.

    - O Implements pode ser manipulado e deve ser importado.

- Criar Services camada responsavél por toda regra da aplicação

  - src/services

    - Criando uma classe de CreateUserService.ts

  - Validações da nossa aplicação e as regras de negocio.

  - Arquitetura do Services.

  - Server -> ( ) -> SERVICES -> REPOSITORIES -> BD

- Criar Controllers

  - Server -> routes -> Controller -> Services (request, response, next)

  - Criar a classe CreateUserController

    - Que recebe os dados da nossa aplicação passando para o nosso Services

    - A request será do body, o que vem no corpo da requisição.

      - Desestrutura: const { name, email, admin } = request.body;

      - Retorno o objeto json

- Rotas

  - src/routes.ts

  - Nesse arquivo será criado as rotas da api

  - Em cada rota será criado uma instacia para receber os metodo( request, response)

    - const createUserController = new CreateUserController();

    - router.post("/api/user", createUserController.handle);

- Server

  - import o arquivo: import { router } from "./routes";

  - declare ele abaixo: app.use(route) = Para que seja refenciado todas as nossas rotas dentro do server.ts

  - Conceito de Middleware

    - Tratando as execoẽs.

      - server.ts -> Controller -> routes -> Service ( throw new Error)

      - Para tratar dos middleware de erro será quatro exeções:

        - Elas são (err: Error, request: Request, response: Response, next: NextFunction)

          - Primeiro verifica o tipo de erro que está chegando.
          - Se é da instancia Error que está declarado no service, se for retorna status 400 em json. Que retorna um objeto de erro.

          - Se não retorna retorna um erro 500, em formato json, que retorna um objeto com status 500, message: Iterno Error.

        - Pode ocorrer um erro ao cadastrar o mesmo e-mail, para teste, observe que entra em loop. Ocorre um erro de: UnhandledPromiseRejectionWarning.

        - Para realizar essa tratativa, é preciso instalar uma biblioteca.

          - execute: yarn add express-async-errors

          - Faça o import da biblioteca para dentro do server que ele se responsabiliza em tratar as exeções.

            - import "express-async-errors";

- Criando as Tags

  - Iremos começar criando a migration de tag.

  - Executando o comando: yarn typeorm migration:create -n CreateTags

    - Dentro de src/database/migrations

      - Foi criado a migration CreateTags.ts

      - Dentro da migration criaremos as colunas da tabela.

      - Para criar a tabela no banco de dados iremos executar o comando: yarn typeorm migration:run

      - Criando a entidade de tags utilizando o comando cli: yarn typeorm entity:create -n Tags

        - Dentro da classe de entidade de tags, criaremos as propriedades de colunas da tabela.

- Criando Repositories para Tag

  - src/repositories/TagsRepositories.ts

    - Que extende aos metodos do Repository do "typeorm"

- Criando Service Tag

- src/services/CreateTagsService.ts

  - O Services guarda a regra de negocio

- Criando Controllers Tag

  - src/controllers/CreateTagController.ts

  - O Controller recebe a request do body, envia para service, que retorna um objeto json de resposta.

- Routes

  - src/routes.ts

  - Criamos a rota para chamada da api.

  - router.post("/api/tags", createTagController.handle);

  - Teremos que criar uma validação de acesso a rota.

  - Será criado um pasta com nome: middleware

    - src/middleware

    - Dentro dessa pasta será criado uma função para fazer a validação de acesso a rota por admin.

      - src/middleware/anseruAdmin

        - Por se tratar de um middleware é preciso passar três parametros na função.

          import {Request, Response, NextFunction} from "express"

    - Em routes.ts

      - Foi adicionado a validação: ansureAdmin, de acesso a rota.

        - router.post("/api/tags", ansureAdmin, createTagController.handle);

        - Assim ele faz uso da validação do middleware criado para validar o acesso a rota.

- Criando Authenticação JWT

  - Iniciando a instalação da biblioteca que será responsavel por criar nosso token :

    - Execute: yarn add jsonwebtoken

    - Execute a instalação da tipagem do json web token: yarn add @types/jsonwebtoken -D

  - Precisamos criptografar a nossa senha, pra isso é preciso instalar a biblioteca de criptografia.

    - Execute: yarn add bcryptjs

    - Execute para instalar as tipagens: yarn add @types/bcryptjs -D

  - Agora iremos trabalhar a criptografia da senha, na classe CreateUserService.ts

    - import {hash} from "bcryptjs"

    - Criou uma constante que vai fazer a criptografia e passo o solt, que será o tamanho.

      - const passwordHash = hash(password, 8)

      - Dentro da minha const user, troco o password, pela const que está fazendo a criptografia.

        - password: passwordHash,

- Criando Service Authenticate

  - src/services/AuthenticateUserService.ts

  - Nessa classe será feito a request dos dados do usuário para login.

    - email / password

    - Criaremos uma Interface.

    - Verificamos se o e-mail existe

    - Verificamos se senha está correta, utilizando a função compare()

      - import { compare } from "bcryptjs";

    - Gera o token

      - Se email existir.
      - A senha for comparada é igual
      - Iremos gerar o token da senha.

      - iremos fazer o import {sign} from "jsonwebtoken"

      - O payload da função sign é esperado uma string, iremos passar o objeto email,
      - Chave secreta
      - O objeto subject, passamos o id do usuario. Tempo de expirição: 1 dia

- Criando Controller Authenticate

  - Recebe o request do body.

  - Instacia a classe AuthenticateUser Service.

  - O metodo authenticateUserService.execute() passar dois parametros, email e password para a geração do token.

  - Retorna um objeto json token

- Criando Routes AuthenticateUser
