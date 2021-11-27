import test from 'ava';
import sinon from 'sinon';
import lambdaTester = require('lambda-tester');
import { create, getAll } from '../src/index';
import * as dynamoDb from '../src/dynamodb';

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

test('test for lambda handler2', async t => {
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
