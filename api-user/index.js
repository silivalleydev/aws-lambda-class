const connectInfo = require('./env');
const getMethod = require('./get');
const postMethod = require('./post');
const putMethod = require('./put');
const deleteMethod = require('./delete');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: connectInfo.host,
    user: connectInfo.user,
    port: '3306',
    password: connectInfo.password,
    database: connectInfo.database
})
exports.handler = async function(event, context, callback){

        //console.log('Received event:', JSON.stringify(event, null, 2));

        let body;
        let statusCode = '200';
        const headers = {
            'Content-Type': 'application/json',
        };
    
        try {
            switch (event.httpMethod) {
                case 'DELETE':
                    body = await deleteMethod(conn, event);
                    break;
                case 'GET':
                    console.log(event.queryStringParameters, getMethod);
                    body = await getMethod(conn, event);
                    break;
                case 'POST':
                    body = await postMethod(conn, event);
                    break;
                case 'PUT':
                    body = await putMethod(conn, event);
                    break;
                default:
                    throw new Error(`Unsupported method "${event.httpMethod}"`);
            }
        } catch (err) {
            statusCode = '400';
            body = err.message;
        } finally {
            body = JSON.stringify(body);
        }
    
        return {
            statusCode,
            body,
            headers,
        };
};