import test from 'ava';
import sinon from 'sinon';
import AWS from 'aws-sdk';
import namoid from 'nanoid';

import * as dynamodb from '@aws/dynamodb';

test.afterEach.always(() => {
    sinon.restore();
});

test.serial('DynamoDB put CASE 1', async t => {
    const putSpy = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, 'put').returns(<
        any
    >{
        promise: () => {
            return Promise.resolve();
        },
    });

    sinon.stub(namoid, 'nanoid').returns('jhwezMvNkcm39W-O8CQSj');

    sinon.stub(dynamodb, 'getISODate').returns('2021-11-27');

    const event = {
        body: JSON.stringify({
            name: 'name',
            email: 'email@email.com',
        }),
    };

    await dynamodb.create(<any>event);

    const expectedParams = {
        TableName: 'user',
        Item: {
            pk: 'jhwezMvNkcm39W-O8CQSj',
            name: 'name',
            email: 'email@email.com',
            created_at: '2021-11-27',
        },
    };

    t.true(putSpy.calledWith(expectedParams));
});

test.serial('DynamoDB put CASE 2', async t => {
    const event = {};

    await t.throwsAsync(() => dynamodb.create(<any>event), {
        message: 'payload required',
    });
});

test.serial('DynamoDB scan CASE 1', async t => {
    const scanSpy = sinon
        .stub(AWS.DynamoDB.DocumentClient.prototype, 'scan')
        .returns(<any>{
            promise: () => {
                return Promise.resolve({
                    Count: 1,
                    Items: [],
                });
            },
        });

    await dynamodb.getAll();

    const expectedParams = {
        TableName: 'user',
    };

    t.true(scanSpy.calledWith(expectedParams));
});

test.serial('DynamoDB get CASE 1', async t => {
    const getSpy = sinon.stub(AWS.DynamoDB.DocumentClient.prototype, 'get').returns(<
        any
    >{
        promise: () => {
            return Promise.resolve({});
        },
    });

    const event = {
        pathParameters: {
            pk: 'pk',
        },
    };

    await dynamodb.getItemByPk(<any>event);

    const expectedParams = {
        TableName: 'user',
        Key: { pk: 'pk' },
    };

    t.true(getSpy.calledWith(expectedParams));
});

test.serial('DynamoDB get CASE 2', async t => {
    await t.throwsAsync(() => dynamodb.getItemByPk(<any>{ pathParameters: {} }), {
        message: 'pk is required',
    });
});
