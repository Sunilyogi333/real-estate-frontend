var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "1230",
    database: 'serenity',
    port: 3307,
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
}
);

module.exports = con;
