import test from 'ava';
import sinon from 'sinon';
import lambdaTester = require('lambda-tester');
import { create, getAll, getByPk } from '@lambdas/index';
import * as dynamoDb from '@aws/dynamodb';

test.afterEach.always(() => {
    sinon.restore();
});

test('test for create', async t => {
    const createStub = sinon.stub(dynamoDb, 'create').resolves();

    const event = {
        body: {
            name: 'name',
            email: 'email@email.com',
        },
    };

    await lambdaTester(create)
        .event(event)
        .expectResult(result => {
            t.is(result.statusCode, 200);
            t.not(result.body, { message: 'ok' });
        });

    t.true(createStub.calledWith(<any>event));
});

test('test for lambda getAll', async t => {
    const resultMock = [
        {
            name: 'name',
            created_at: '2021-11-27T15:10:41.770Z',
            pk: 'lCqlNkYbkU-7_478uCRSf',
            email: 'email@company.com.br',
        },
    ];
    const getAllStub = sinon
        .stub(dynamoDb, 'getAll')
        .resolves(<any>{ data: resultMock, count: 1 });

    await lambdaTester(getAll)
        .event({})
        .expectResult(result => {
            t.is(result.statusCode, 200);
            t.deepEqual(result.body, JSON.stringify({ data: resultMock, count: 1 }));
        });

    t.true(getAllStub.called);
});

test.serial('test for lambda getByPk CASE 1', async t => {
    const resultMock = [
        {
            name: 'name',
            created_at: '2021-11-27T15:10:41.770Z',
            pk: 'lCqlNkYbkU-7_478uCRSf',
            email: 'email@company.com.br',
        },
    ];

    const getItemByPkStub = sinon
        .stub(dynamoDb, 'getItemByPk')
        .resolves(<any>resultMock);

    const event = { pathParameters: { pk: 'lCqlNkYbkU-7_478uCRSf' } };

    await lambdaTester(getByPk)
        .event(event)
        .expectResult(result => {
            t.is(result.statusCode, 200);
            t.deepEqual(result.body, JSON.stringify(resultMock));
        });

    t.true(getItemByPkStub.calledWith(<any>event));
});

test.serial('test for lambda getByPk CASE 2', async t => {
    const getItemByPkStub = sinon
        .stub(dynamoDb, 'getItemByPk')
        .resolves(<any>undefined);

    const event = { pathParameters: { pk: 'lCqlNkYbkU-7_478uCRSf' } };

    await lambdaTester(getByPk)
        .event(event)
        .expectResult(result => {
            t.is(result.statusCode, 404);
            t.deepEqual(result.body, JSON.stringify({ message: 'user not found' }));
        });

    t.true(getItemByPkStub.calledWith(<any>event));
});
