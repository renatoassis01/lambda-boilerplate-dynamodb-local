import AWS = require('aws-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import namoid from 'nanoid';
import { User } from '@interfaces/user';
import { builderUpdateItem } from '../utils/builder';

const getTableName = (): string => {
    return process.env.DYNAMO_TABLE || 'user';
};

export const getISODate = (): string => {
    return new Date().toISOString();
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
            created_at: getISODate(),
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

export const getItemByPk = async (
    event: AWSLambda.APIGatewayProxyEvent,
): Promise<User> => {
    const { pk } = event.pathParameters! || undefined;
    if (!pk) throw new Error(`pk is required`);

    const params: DocumentClient.Get = {
        TableName: getTableName(),
        Key: { pk },
    };
    const { Item } = await dynamoDb.get(params).promise();

    return Item as User;
};

export const updateByPk = async (
    event: AWSLambda.APIGatewayProxyEvent,
): Promise<User | undefined> => {
    const { pk } = event.pathParameters!;
    const { body } = event;
    if (!pk) throw new Error(`pk is required`);
    if (!body) throw new Error(`body is required`);

    const item: User = JSON.parse(body);

    const params: DocumentClient.UpdateItemInput = {
        ...builderUpdateItem<User>({ pk }, item, getTableName()),
        ConditionExpression: 'pk = :pk',
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDb.update(params).promise();
        const { Attributes } = result.$response.data!;
        return Attributes as User;
    } catch (error) {
        if (error.code === 'ConditionalCheckFailedException') return undefined;
        console.log(error);
        throw new Error(`internal error`);
    }
};
