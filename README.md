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

  - Dentro da classe routes.ts, iremos instanciar a nossa controller e criar uma rota de login.

- Criando a migration Compliments

  - Executamos o comando: yarn typeorm migration:create -n CreateCompliments

  - Assim serado criado uma classe em src/database/migrations/CreateCompliments

    - Onde será criado as colunas da tabela: Compliments

    - Criando relacionamento entre as tabelas.

      - ForeignKey: abaixo do array de columns da tabela.

        - Referenciando os ids de relacionamento entre as tabelas.

        - Depois de criado as FK de relacionamento entre as tabelas execute comando: yarn typeorm migration:run.

        - Para que seja criado a tabela Compliments no banco de dados.

- Criando Entities Compliments

  - Executamos o comando: yarn typeorm entity:create -n Compliment

  - @Entity("compliments") - Referencia a tabela do banco.

  - No objeto de class Compliment, passamos as colunas e o tipo de cada.

  - Criamos o constructor para verificar se existe id.

  - Devido a tabela Compliments ter relacionamento, é preciso fazer referencia na classe de Entities Compiments.

    - Criando @JoinColumm({}) para as tabelas que fazem refencia ao FK.

      - Podemos referencia o tipo de relacionamento: 1 - 1 ou 1 - \*

        - Utilizando a tag @ManyToOne(() => Tag)

          - Uma função passando a Tag, informando que uma Varios, compliments pode repetir o id da TAG.

- Criando Repositories Compliments

  - src/repositories/complimentsRepositories.

  - Para receber os metodos da propriedade Typeorm

- Criando Services Compliments

  - src/services/complimentsServices.

  - Faço a instacia ComplimentsRepositories, para ter acesso aos metodos

  - Faço a instacia UserRepositories, para ter acesso aos metodos

  - Validamos para saber se o usuário está criando um elogio para ele mesmo.

  - Faço uma chamada de validação pegando id(user_receiver) para saber se existe.

  - Iremos criar o metodo de criação de elogios.

  - Metodo de salvar o elogio

- Criando Controller Compliments

  - src/controller/CreateComplimentController

  - Iremos receber a requisição do body

    - Instancia as validações do sevices.

    - criamos uma variavel para recebe o retorno do metodo service.

    - Retorna uma resposta de um objeto em json

- Criando Routes

  - src/routes.ts

  - Criamos a instacia do compĺimentController

  - Criamos a rota da api compliments, mandado a requisição para a controller, que chama o metodo handle.

- Criando um Middleware de Authentication

  - src/middleware/ensureAuthenticated.ts

  - Para criação de middleware precisamos importar os metodos do express.

  - Barer token é authenticated

  - Iremos utilizar o postman para fazer a authenticacao

    - Dentro do postman: Authorization/ Bearer Token.

      - Colar o token gerado pelo sistema.

  - Na classe ensureAuthenticated

    - Iremos acessar o authToken: request.headers.authorization

      - Para teste faço o import da classe para o routes e faça a chamada no postman

      - Validamos o token se está preenchido.

    - Para validar se o authToken é valido

      - Import a biblioteca jsonwebtoken: import { verify } from "jsonwebtoken";

      - Para verificar se o token a valido utilize a funcao verify() do jsonwebtoken.

        - Dentro da funcao passe verify(token, chave secreta),

        - Será criado uma tratamento de erro utilizando try/cath, para validar o token.

          - Caso o token esteja valido o usuário está liberado para fazer requisição, acessando as rotas

            - const decoder = verify(token, "60fc7576b533a5f425cab533d9e1efa4");

              decode {
              email: 'wagner.oliveira@gmail.com',
              iat: 1642686084,
              exp: 1642772484,
              sub: '0a87df6e-fb71-454e-85ce-a473bd9f3ed9'
              }

            - Iremos desestruturar esse decode, para consumir somente o necessário e retorna uma informação que é id usuário.

              - const { sub } = verify(token, "60fc7576b533a5f425cab533d9e1efa4");

              - Queremos fazer a requisição do sub, dessa forma.

                request.user_id = sub;

                - Não permitido, por que não existe o type user_id no "express" para fazer request.

                  - É preciso reescrever o arquivo de tipagem para ser reconheido. Iremos recriar o arquivo.

                    - src/@types/express/index.d.ts

                    - Adicione o caminho do @types no arquivo: tsconfig.json

                      "typeRoots": ["./src/@types"],

                    - Para as rotas que depende de authenticação podemos importar para routes e adicionar a atheticação.

- Refatorando Middleware de usuário admin.

  - src/middleware/ansureAdmin.ts

    - O nosso login de authenticação está pronto.

    - Agora precisamos refatorar o nosso middleware de validar usuário se ele é um admin.

      - Já recriamos o request do express para acessar o user_id

      - Vamos consumir o id dele.

        - const { user_id } = request

        - Verificando se o usuário está cadastrado como administrador.

  - src/controller/CreateComplimentController.ts

    - Para criar tags, estamos recebendo id usuário pelo metodo, request body.

    - Precisamos forçar que usuário que está criando a Tag, seja authenticado.

      - const { user_id } = request;

    - Para isso iremos pegar o id do usuário do nosso request, que criamos.

      - @types/express/index.d.ts

- Criando Service lista de elogios recebido por usuário

  - src/services/ListUserReceiveComplimentsService.ts

    - Uma forma de retornar os objetos utilizando o where.

      where: {
      user_sender: user_id,
      },
      relations: ["userSender", "userReceiver", "tag"]

      - O Relations espera receber um array de objetos, então devemos informar quais os objetos queremos retornar.

      - Verifique as entidades que faz o relacionamento com a tabela que precisa pegar os dados.

- Criando Controller lista de elogios recebido por usuário

  - src/controller/ListUserReceiveComplimentsController.ts

- Criando Service lista de elogios enviado por usuário

  - src/services/ListUserSenderService.ts

- Criando Controller lista de elogios enviado por usuário

  - src/services/ListUserSenderController.ts

- Criando Service lista de usuário

  - src/services/ListUserService.ts

- Criando Controller lista de usuário

  - src/services/ListUserController.ts

- Criando Service lista de tags

  - src/services/ListTagsService.ts

- Criando Controller lista de tags

  - src/services/ListTagsController.ts

- Criado rotas

  - src/routes

    - ListUserSender
    - ListUserReceiver
    - ListTags
    - ListUsers

- Criando um metodo de transformar metodos de uma classe no typeORM

  - Documentação: https://github.com/typestack/class-transformer

  - Instalar: yarn add class-transformer

  - Esse metodo ele tem o poder de customizar um objeto em sua entidade.

    - src/entities/tags

    - Será criado uma endPoint customizado para retornar na rota de tags.

      - Import o import { Expose } from "class-transformer"

      - crie o metodo que será manipulado e alterado, pelo Expose.

            @Expose({name: "name_custom"})
            nameCustom(): string {
              return `#${this.name}`
            }

  - Para consumir este metodo de custom da class-trasnformer

    - src/controller/ListTagsService.ts

      - import {classToPlain} from "class-transformer"

      - Apos ser feito a busca pelas tags e criado uma string a mais com nome de #custom_name.

      - crie um return classToPlain(tags).

      - Para que seja retornado um objeto json de tags

  - Para ocultar dados do endPoint, como password.

    - Utilizaremos da biblioteca class-transformer

      - src/entities/User.ts

      - import { Exclude } from 'class-transformer'

      - aplique @Exclude acima da tabela que deve ser cultada

        @Exclude()
        @Column()
        password: string;

  - Para consumir este metodo de custom da class-trasnformer

    - src/controller/ListUsersService.ts

      - import {classToPlain} from "class-transformer"

      - Apos fazer a ocultação do endPoint

      - crie um return classToPlain(users).

      - Para que seja retornado um objeto json de users

- Serviços extras

  - Criar um serviço de envio de e-mail, notificando o elogio criado.
  - Colocar em produção: Heroku, Amazom
  - Criar um front-end

  - Para integrar com seu front-end, add a bibliotece Cors e as tipagens.

    - yarn add cors
    - yarn add @types/cors -D

    - Na classe server.ts

      - import cors from "cors"

  - Aplicar cleanCode

  - Aplicar clean Arch

  - No throw erro = criar erros customizado.

  - Migrar para banco anternativos.

  - Criar paginação

  - Criar centru para criar logs da aplicação

  - Criar docker

  - Criar metodo de delete e update
