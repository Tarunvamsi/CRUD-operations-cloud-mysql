const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'googleforms.c6isbbs62jkt.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'password',
  database: 'facebook'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Middleware to parse JSON
app.use(express.json());

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Create
app.post('/create', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO facebookdata (name, email) VALUES (?, ?)';
  connection.query(sql, [name, email], (err, result) => {
    if (err) throw err;
    res.json({ message: 'User created successfully', userId: result.insertId });
  });
});

// Read
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM facebookdata';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update
app.put('/update/:id', (req, res) => {
  const { name, email } = req.body;
  const userId = req.params.id;
  const sql = 'UPDATE facebookdata SET name=?, email=? WHERE id=?';
  connection.query(sql, [name, email, userId], (err) => {
    if (err) throw err;
    res.json({ message: 'User updated successfully' });
  });
});

// Delete
app.delete('/delete/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'DELETE FROM facebookdata WHERE id=?';
  connection.query(sql, [userId], (err) => {
    if (err) throw err;
    res.json({ message: 'User deleted successfully' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
