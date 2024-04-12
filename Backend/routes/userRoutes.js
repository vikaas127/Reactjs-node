// userRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Import the database connection module
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.get('/', async (req, res) => {
  try {
    const users = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/register', async (req, res) => {
  try {
    
        // Extract username, email, and password from the request body
        const { username, email, password } = req.body;
    
        // Insert the user data into the database
        const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);
    
        console.log('User registered successfully:', { username, email });
        res.status(201).json({ message: 'User registered successfully' }); // Send a success response back to the client
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send an error response back to the client
      }
    });
   
    
    


// Import the database connection



// Define the route for user login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
console.log(password);
    // Query the database to find the user by email
    const rows = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log(rows);
    // Check if the query returned any results
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the password provided with the hashed password stored in the database
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // If the password is valid, generate a JWT token
    const token = jwt.sign({ userId: user.id }, 'deepanshu_vikas', { expiresIn: '48h' });

    // Send the token in the response
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Assuming you have a MySQL connection pool named 'pool'

router.get('/users', async (req, res) => {
  try {
    // Query the database to fetch the list of users
    const rows = await db.query('SELECT * FROM users');

    // Send the list of users as a JSON response
    res.json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
