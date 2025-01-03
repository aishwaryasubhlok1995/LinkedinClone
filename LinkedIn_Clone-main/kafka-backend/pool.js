var mysql = require("mysql");
var pool = mysql.createPool({
  connectionLimit: 100,
  port: "3306",
  host: "34.212.99.86",
  user: "root",
  password: "rootpass123",
  database: "linkedin"
});

module.exports = pool;
