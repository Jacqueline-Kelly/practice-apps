const mysql = require("mysql2");
const Promise = require("bluebird");

// Configure process.env variables in ../.env
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

db.queryAsync(
  "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, cookie VARCHAR(200) NOT NULL, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, address1 VARCHAR(100) NOT NULL, address2 VARCHAR(100), city VARCHAR(100) NOT NULL, state VARCHAR(100) NOT NULL, zipCode VARCHAR(5) NOT NULL, phoneNumber VARCHAR(15) NOT NULL, creditCard VARCHAR(16) NOT NULL, expiration VARCHAR(5) NOT NULL, cvv VARCHAR(3) NOT NULL, billingZip VARCHAR(5) NOT NULL)"
)

// db.connectAsync()
//   .then(() => console.log(`Connected to MySQL as id: ${db.threadId}`))
//   .then(() =>
//     // Expand this table definition as needed:
//     db.queryAsync(
//       "CREATE TABLE IF NOT EXISTS responses (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, address1 VARCHAR(100) NOT NULL, address2 VARCHAR(100), city VARCHAR(100) NOT NULL, state VARCHAR(100) NOT NULL, zipCode VARCHAR(5) NOT NULL, phoneNumber VARCHAR(15) NOT NULL, creditCard VARCHAR(16) NOT NULL, expiration VARCHAR(5) NOT NULL, cvv VARCHAR(3) NOT NULL, billingZip VARCHAR(5) NOT NULL)"
//     )
//   )
//   .catch((err) => console.log(err));

module.exports = db;
