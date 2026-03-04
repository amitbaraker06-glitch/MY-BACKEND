const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory "database"
let users = [];

// Signup route
app.post('/signup', (req, res) => {
    const { name, email, phone, role, location, password } = req.body;

    if (!name || !email || !phone || !role || !location || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = users.find(u => u.email === email || u.phone === phone);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    users.push({ name, email, phone, role, location, password });
    res.status(201).json({ message: 'Signup successful' });
});

// Login route
app.post('/login', (req, res) => {
    const { emailOrPhone, password } = req.body;

    const user = users.find(u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', role: user.role });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
