//ranking_get_sample.js
var BreakException = {};
var mysql = require('mysql');
var connectInfo = require('./env.js');
var async = require('async');
//create connection pool
var pool  = mysql.createPool({
    connectionLimit : 20,
    host     : connectInfo.host,
    user     : connectInfo.user,
    password : connectInfo.password,
    port     : '3306',
    database : connectInfo.database
});

exports.handler = function(event, context, callback){
    var count;
    //top은 매핑된 쿼리파라미터 값입니다.
    if (!event.top || isNaN(event.top)) {
        context.fail('Bad Request: You submitted invalid input');
        return;
    } 

    count = Number(event.top);

    //비동기처리를 위해서 async를 사용하였습니다.
    async.waterfall([
        function (cb) {
            //Weekly Ranking을 가져옵니다.
            pool.query(
                'SELECT * FROM board',
                function(err, rows, fields) {
                    if (!err) {
                        //정상적으로 가져오면 데이터와 함께 다음 함수를 호출합니다.
                        cb(null, rows);
                    } else {
                        //에러가 나면 에러를 전달합니다.
                        console.log('Error while performing Query.', err);
                        cb(500);
                    }
                }
            );
        }],
        function (err, result) {
            if (!err) {
                if (result.length > 0) {
                    var res = [];

                    //쿼리 파라미터로 받은 top 만큼만 응답메세지로 만들어서 보냅니다.
                    try {
                        result.forEach(function(value, index) {
                            if (index >= count) throw BreakException;

                            var temp = {};
                            // temp.name = value.Name;
                            // temp.point = value.Point;
                            res.push(temp);
                        });
                    } catch (e) {
                        if (e !== BreakException) throw e;
                    }
                    context.succeed("sdcs");
                } else {
                    context.succeed('');
                }
            } else {
                //에러는 코드만 받아서 처리하도록 했습니다.
                if (err === 400) {
                    context.fail('Bad Request: You submitted invalid input');
                } else { 
                    context.fail('Internal Error: Internal Error');
                }
            }
        } 
    );
};