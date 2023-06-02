const mysql = require("mysql");

const pool = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'samka-03',
  database:'cars',
  connectionLimit:100
})

module.exports = pool;