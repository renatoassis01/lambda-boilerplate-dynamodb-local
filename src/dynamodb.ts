import AWS = require('aws-sdk');
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

    const params = {
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

export const getAll = async (): Promise<User[]> => {
    const params = {
        TableName: getTableName(),
    };
    const data = await dynamoDb.scan(params).promise();

    return data.Items as User[];
};
