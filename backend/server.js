const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// Connection URI
const uri = 'mongodb://localhost:27017'; // Change this URI according to your MongoDB setup

// Database Name
const dbName = 'rent-management'; // Change this to the name of your database

// Create a new MongoClient
const client = new MongoClient(uri);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Function to confirm connection to the database
async function confirmDBConnection() {
  try {
    // Connect the client to the server
    await client.connect();
    console.log('Connected to MongoDB server');

    // Connect to the specific database
    const db = client.db(dbName);

    // Log confirmation message
    console.log('Successfully connected to database:', dbName);
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

// Route for user sign up
app.post('/signup', async (req, res) => {
 
  try {
    // Connect to the database
    await confirmDBConnection();

    // Get request body data
    const { email, username, password } = req.body;

    // Connect to the specific database
    const db = client.db(dbName);

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Insert new user into the database
    await db.collection('users').insertOne({ email, username, password });

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    // Close the connection when finished
    await client.close();
    console.log('Connection to MongoDB closed');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
