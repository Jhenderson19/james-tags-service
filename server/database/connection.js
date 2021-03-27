const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fec_pathfinder_tags'
});

connection.connect((err) => {
    if (err) {
      console.log('Error connecting to the database: ' + err.message);
    }
});



module.exports = connection;