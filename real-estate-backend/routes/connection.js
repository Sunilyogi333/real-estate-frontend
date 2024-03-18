var mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

var con = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port,
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
}
);

module.exports = con;
