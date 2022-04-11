module.exports = async function del (conn, event) {

    let query = `delete from user where user_id=${event.queryStringParameters.user_id}`;

    try {
        return await new Promise((resolve, reject) => {
            conn.query(
                query,
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
        console.log('get error=>', error)
        return {
            status: "FAIL"
        };
    }
}