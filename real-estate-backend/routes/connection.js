var mysql = require('mysql');
var con = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
pool.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = con.promise()

// con.connect(function (err) {
//     if (err) throw err;
//     console.log("Connected!");
// }
// );

// module.exports = con;
