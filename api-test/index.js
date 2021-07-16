const AWS = require('aws-sdk');
const connectInfo = require('./env');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: connectInfo.host,
    user: connectInfo.user,
    password: connectInfo.password,
    database: connectInfo.database
})

exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        switch (event.httpMethod) {
            case 'DELETE':
                // body = await dynamo.delete(JSON.parse(event.body)).promise();
                break;
            case 'GET':
                const SQL = "SELECT * FROM board";
                connection.query(SQL, function (err, result, fields) {
                    if (err) {
                        body = err;
                    } else {
                        body = result;
                    }
                })
                break;
            case 'POST':
                // body = await dynamo.put(JSON.parse(event.body)).promise();
                break;
            case 'PUT':
                // body = await dynamo.update(JSON.parse(event.body)).promise();
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
        statusCode: '200',
        body:'222',
        headers,
    };
};
