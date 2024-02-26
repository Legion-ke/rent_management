// Require necessary modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Set up MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Given007',
  database: 'rent_management'
});

// Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

// Use bodyParser middleware to parse POST request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define route to handle POST request to create a new tenant
app.post('/createTenant', (req, res) => {
  const { username, email, houseNo } = req.body;

  // Insert new tenant data into the database
  connection.query('INSERT INTO tenants (username, email, house_no) VALUES (?, ?, ?)', [username, email, houseNo], (error, results, fields) => {
    if (error) throw error;
    res.send('Tenant created successfully!');
  });
});

// Define route to fetch and display all tenants
app.get('/fetchTenants', (req, res) => {
  // Fetch all tenants from the database
  connection.query('SELECT * FROM tenants', (error, results, fields) => {
    if (error) throw error;
    res.json(results);
  });
});

// Serve your HTML file
app.use(express.static(__dirname + '/public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
