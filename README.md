# lambda-boilerplate-run-dynamodb-local

Este é um exemplo de desenvolvimento local utilizando lambdas e o dynamodb. O dynamodb é um banco de dados noSQL altamente performático, utilizando em muito casos.

Motivações:
Ao desenvolver uma lambda é sempre uma dificuldade de testar as lambdas localmente. A aws até disponibiliza um emulador, mas até o momento esse emulador não tem suporte ao typescript. Utilizando o serverless-offiline + emulador do dynamodb é possivel rodar localmente e ainda com suporte para typescript. Assim evitando o uso do dynamodb no desenvolvimento diminuíndo os custos.

Este exemplo é baseado na versão [SDK v2](https://docs.aws.amazon.com/pt_br/sdk-for-javascript/v2/developer-guide/welcome.html) da AWS para NodeJS.

As lambdas estão baseadas no modelo api [gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html) para serem acessadas facilmente via http localmente, porém pode se adaptar para utilizar por exemplo com o [SNS](https://docs.aws.amazon.com/pt_br/lambda/latest/dg/with-sns.html). O [serverless](https://www.serverless.com/framework/docs/providers/aws/events/sns) possui exemplos de casos com SNS.

Neste exemplo você vai encontrar exemplos de testes unitários para lambdas, utilizando sinon + AvaJS, por terem uma api mais simples em relação ao Jest.

Para rodar o projeto é necessário possuir **_Docker_** e **_*docker-compose*_** configurados.

```sh
docker-compose up -d
npm run migrate
npm run start:dev
```

Caso tenha o instalado aws-cli e configurado e o make instalados

> `make desc-dynamo-table table=user` para ver a tabela criada

As rotas serão impressas no terminal. Você pode usar o `postman` ou `insomnia` para interagir com as lambdas.

exemplo de payload para o `POST`:

```json
{
    "name": "name",
    "email": "name@email"
}
```

Referências:

https://www.serverless.com/plugins/serverless-dynamodb-local

https://www.serverless.com/plugins/serverless-offline

https://github.com/dherault/serverless-offline

https://github.com/PauloGoncalvesBH/lambda-unit-test

https://github.com/renatoassis01/lambda-boilerplate-run-local
