var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'localhost',
    user: 'sunil',
    password: "Sunil@333",
    database: 'serenity',
    port: 3306,
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
}
);

module.exports = con;
