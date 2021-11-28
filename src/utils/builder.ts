import { DocumentClient } from 'aws-sdk/clients/dynamodb';

export const builderResponse = <T = Record<string, unknown>>(
    statusCode: number,
    payload: T,
): AWSLambda.ProxyResult => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(payload),
    };
};

export const builderUpdateItem = <T>(
    keys: Record<string, unknown>,
    item: T,
    tableName: string,
): DocumentClient.UpdateItemInput => {
    return {
        TableName: tableName,
        Key: keys,
        UpdateExpression: 'SET '.concat(
            Object.keys(item)
                .map(k => `#${k} = :${k}`)
                .join(', '),
        ),
        ExpressionAttributeNames: Object.entries(item).reduce(
            (acc, cur) => ({ ...acc, [`#${cur[0]}`]: cur[0] }),
            {},
        ),
        ExpressionAttributeValues: {
            ...Object.entries(item).reduce(
                (acc, cur) => ({ ...acc, [`:${cur[0]}`]: cur[1] }),
                {},
            ),
            ...Object.entries(keys).reduce(
                (acc, cur) => ({ ...acc, [`:${cur[0]}`]: cur[1] }),
                {},
            ),
        },
    };
};
