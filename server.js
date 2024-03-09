const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tenant = require('./model/tenant');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/given', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const app = express();
app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword } = req.body;

    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' });
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string' || plainTextPassword.length < 6) {
        return res.json({
            status: 'error',
            error: 'Invalid password. It should be at least 6 characters long.'
        });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
        const response = await tenant.create({
            username,
            password
        });
        console.log('Tenant created successfully: ', response);
        res.json({ status: 'ok' });
    } catch (error) {
        if (error.code === 11000) {
            return res.json({ status: 'error', error: 'Username already in use' });
        }
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});

app.listen(9999, () => {
    console.log('Server up at 9999');
});
