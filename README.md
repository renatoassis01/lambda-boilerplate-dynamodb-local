# lambda-boilerplate-run-dynamodb-local

Ao desenvolver uma lambda, é sempre uma dificuldade de testar as lambdas localmente. A aws até disponibiliza um emulador, mas até o momento esse emulador não tem suporte ao typescript. Utilizando o serverless-offiline é possivel rodar localmente e ainda com suporte para typescript

```sh
docker-compose up -d
npm rum migrate
```

make desc-dynamo-table table=table

referências:

https://www.serverless.com/plugins/serverless-dynamodb-local

https://www.serverless.com/plugins/serverless-offline

https://github.com/dherault/serverless-offline

https://github.com/PauloGoncalvesBH/lambda-unit-test

https://github.com/renatoassis01/lambda-boilerplate-run-local
