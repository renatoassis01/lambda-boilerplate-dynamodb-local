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
