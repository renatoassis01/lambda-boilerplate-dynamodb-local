export const builderResponse = (
    statusCode: number,
    payload: Record<string, unknown>,
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
