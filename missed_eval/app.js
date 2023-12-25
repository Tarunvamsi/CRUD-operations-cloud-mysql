const express = require('express');
const mysql = require('mysql2');

const app = express();

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'googleforms.c6isbbs62jkt.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'password',
    database: 'users'
});

connection.connect();

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/register', (req, res) => {
    const { first_name, last_name, email, password, confirm_password } = req.body;
    const user = { first_name, last_name, email, password, confirm_password };
    
    // Insert user data into the database
    connection.query('INSERT INTO user SET ?', user, (error, results) => {
        if (error) {
            console.error('Error registering user:', error.message); // Log the specific error message
            res.status(500).send('Error registering user');
            return;
        }
        console.log('User registered:', results);
        res.send('Registration successful!');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
