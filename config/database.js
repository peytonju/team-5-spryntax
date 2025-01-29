require('dotenv').config();  // Load environment variables
const mysql = require('mysql');
// Create a connection pool to manage multiple connections efficiently 
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

//Export the database connection so other files can use it
module.exports = db;
