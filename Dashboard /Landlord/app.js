const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'legion',
  password: 'Given@007',
  database: 'rent_management'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

const username = 'exampleUsername'; // Assuming you get this from somewhere
const email = 'example@example.com'; // Assuming you get this from somewhere
const houseNo = '123'; // Assuming you get this from somewhere

const sql = `INSERT INTO rent_management (username, email, house_no) VALUES (?, ?, ?)`;
const values = [username, email, houseNo];

connection.query(sql, values, (err, result) => {
  if (err) {
    console.error('Error executing query: ' + err.stack);
    return;
  }
  console.log('New record created successfully');
});

connection.end();
