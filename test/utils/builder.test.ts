import test from 'ava';
import { builderResponse } from '@utils/builder';

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
