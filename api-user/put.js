module.exports = async function put (conn, event) {
    try {
        let query = `update user set name='${JSON.parse(event.body).name}' where user_id=${JSON.parse(event.body).user_id}`;
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