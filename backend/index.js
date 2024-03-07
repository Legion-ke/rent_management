const express = require('express');
const mongoose = require('mongoose');
const { User } = require('./mongodb');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define schema and model
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Insert dummy data
User.create({ username: 'user1', password: 'password1' }, (err, user) => {
    if (err) return console.error(err);
    console.log('Dummy user created:', user);
});

// Redirect to login page
app.get('/', (req, res) => {
    res.redirect('/Dashboard-login/signin.html');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

