const mysql = require('mysql2');

const pool = mysql.createPool({
   host:'localhost',
   user:'root',
   database:'node-complete',
   password:'8148869556@MySql'
});

module.exports = pool.promise();