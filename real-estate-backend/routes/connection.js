var mysql = require('mysql');
const con = mysql.createPool({
    host: process.env.host, 
    user: process.env.username, 
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

con.getConnection((err, conn) => {
    if(err) console.log(err)
    console.log("Connected successfully")
})

module.exports = con.promise()