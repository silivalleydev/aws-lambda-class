const connectInfo = require('./env');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: connectInfo.host,
    user: connectInfo.user,
    port: '3306',
    password: connectInfo.password,
    database: connectInfo.database
})
exports.handler = async function(event, context, callback){
    let data;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };
    try {
        data = await new Promise((resolve, reject) => {
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
        });
    } catch (error) {
        statusCode = '400';
    }

    return {
        statusCode,
        body: {
            status: statusCode,
            data: JSON.stringify(dbResult)
        },
        headers,
    };

};