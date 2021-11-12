import test from 'ava';
import lambdaTester = require('lambda-tester');
import { handler, handler2 } from '../src/index';

test('test for lambda handler', async t => {
    await lambdaTester(handler)
        .event({})
        .expectResult(result => {
            t.is(result.statusCode, 200);
            t.not(result.body, undefined);
        });
});

test('test for lambda handler2', async t => {
    await lambdaTester(handler2)
        .event({ body: { hello: 'world' } })
        .expectResult(result => {
            t.is(result.statusCode, 200);
            t.deepEqual(result.body, { hello: 'world' });
        });
});
