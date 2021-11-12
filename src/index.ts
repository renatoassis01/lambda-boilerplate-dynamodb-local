import * as dynamodb from './dynamodb';
import { builderResponse } from './utils/builder';

export const create: AWSLambda.Handler = async (
    event: AWSLambda.APIGatewayProxyEvent,
    context: AWSLambda.Context,
    callback: AWSLambda.Callback,
): Promise<void> => {
    await dynamodb.create(event);
    callback(null, builderResponse(200, { message: 'ok' }));
};

export const getAll: AWSLambda.Handler = async (
    event: AWSLambda.APIGatewayProxyEvent,
    context: AWSLambda.Context,
    callback: AWSLambda.Callback,
): Promise<void> => {
    const result = await dynamodb.getAll();
    callback(null, builderResponse(200, { data: result }));
};
