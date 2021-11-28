import test from 'ava';
import { builderResponse, builderUpdateItem } from '@utils/builder';

test('test for builderResponse', t => {
    const expectResult = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: '{"message":"Hello World"}',
    };

    const result = builderResponse(200, { message: 'Hello World' });

    t.deepEqual(result, expectResult);
});

test('test for builderUpdateItem', t => {
    const result = builderUpdateItem(
        { pk: 'pk' },
        {
            name: 'name',
            email: 'email',
        },
        'tableName',
    );

    const expected = {
        TableName: 'tableName',
        Key: { pk: 'pk' },
        UpdateExpression: 'SET #name = :name, #email = :email',
        ExpressionAttributeNames: { '#name': 'name', '#email': 'email' },
        ExpressionAttributeValues: {
            ':name': 'name',
            ':email': 'email',
            ':pk': 'pk',
        },
    };

    t.deepEqual(result, expected);
});
