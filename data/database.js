var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost", // assign your host name
  user: "root", //  assign your database username
  password: <your_password>
  database: <your_database_name> // assign database Name
});

conn.connect(function (err) {
  if (err) throw err;
  console.log("Database is connected successfully !");
});

module.exports = conn;
