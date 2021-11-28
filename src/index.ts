import { builderResponse } from '@utils/builder';
import { User } from '@interfaces/user';
import * as dynamodb from '@aws/dynamodb';

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
    callback(null, builderResponse(200, result));
};

export const getByPk: AWSLambda.Handler = async (
    event: AWSLambda.APIGatewayProxyEvent,
    context: AWSLambda.Context,
    callback: AWSLambda.Callback,
): Promise<void> => {
    const result = await dynamodb.getItemByPk(event);
    if (!result) callback(null, builderResponse(404, { message: 'user not found' }));
    callback(null, builderResponse<User>(200, result));
};

export const updateByPk: AWSLambda.Handler = async (
    event: AWSLambda.APIGatewayProxyEvent,
    context: AWSLambda.Context,
    callback: AWSLambda.Callback,
): Promise<void> => {
    const result = await dynamodb.updateByPk(event);
    if (!result) callback(null, builderResponse(404, { message: 'user not found' }));
    callback(null, builderResponse<User>(200, result!));
};
