const AWS = require('aws-sdk');
const connectInfo = require('./env');
const mysql = require('mysql');
var async = require('async');
var BreakException = {};

const conn = mysql.createConnection({
    host: connectInfo.host,
    user: connectInfo.user,
    port: '3306',
    password: connectInfo.password,
    database: connectInfo.database
})
exports.handler = async function(event, context, callback){
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };
    const dbResult = await new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM board',
            function(err, rows, fields) {
                console.log('검색결과?', err, rows, fields);
                if (!err) {
                    resolve(rows);
                } else {
                    console.log('Error while performing Query.', err);
                    reject(err)
                }
            }
        );
    })

    return {
        statusCode: '200',
        body: JSON.stringify(dbResult),
        headers,
    };

};