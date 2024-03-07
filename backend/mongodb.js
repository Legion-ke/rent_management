const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define user schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});

// Create User model
const User = mongoose.model('User', userSchema);

// Insert dummy data
User.create({ username: 'Given', password: '1234' }, (err, user) => {
    if (err) return console.error(err);
    console.log('Dummy user created:', user);
});

module.exports = { User };
