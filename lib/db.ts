const mysql = require("serverless-mysql");

export const db = mysql({
  config: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  },
});

function init() {
  db.query("CREATE DATABASE IF NOT EXISTS main;");
  db.query("USE main;");
  db.query(
    "CREATE TABLE IF NOT EXISTS users(userId int NOT NULL AUTO_INCREMENT, email varchar(255) UNIQUE, hash varchar(255), salt varchar(255), iv varchar(255), dt_created DATETIME DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(userId));",
    function (error, result, fields) {
      console.log(fields);
      console.log(error);
      console.log(result);
    },
  );

  db.query(
    "CREATE TABLE IF NOT EXISTS accounts(accountId int NOT NULL AUTO_INCREMENT, userId int NOT NULL, url varchar(255), username varchar(255), hash varchar(255),  createdAt DATETIME, PRIMARY KEY(accountId), FOREIGN KEY (userId) REFERENCES users(userId))",
    function (error, result, fields) {
      console.log(fields);
      console.log(error);
      console.log(result);
    },
  );
}
