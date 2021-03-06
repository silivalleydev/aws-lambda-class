module.exports = async function post (conn, event) {
    try {
        let query = `insert into user(name) values('${JSON.parse(event.body).name}')`;
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