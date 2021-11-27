import AWS = require('aws-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import namoid from 'nanoid';
import { User } from './interfaces/user';

const getTableName = (): string => {
    return process.env.DYNAMO_TABLE || 'user';
};

const dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION || 'localhost',
    endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
});

export const create = async (
    event: AWSLambda.APIGatewayProxyEvent,
): Promise<void> => {
    if (!event.body) throw new Error(`payload required`);

    const body: User = JSON.parse(event.body);

    const params: DocumentClient.Put = {
        TableName: getTableName(),
        Item: {
            pk: namoid.nanoid(),
            name: body.name,
            email: body.email,
            created_at: new Date().toISOString(),
        },
    };

    await dynamoDb.put(params).promise();
};

export const getAll = async (): Promise<{ data: User[]; count: number }> => {
    const params: DocumentClient.ScanInput = {
        TableName: getTableName(),
    };
    const result = await dynamoDb.scan(params).promise();

    return { data: result.Items as User[], count: result.Count || 0 };
};
