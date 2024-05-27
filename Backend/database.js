const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'yourusername',
    password: 'yourpassword',
    database: 'lecture_management'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Function to register a new user
exports.registerUser = async (username, password, role) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user to the database
        await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        console.log('User registered successfully');
        return true;
    } catch (err) {
        console.error('Error registering user:', err);
        return false;
    }
};

// Function to find a user by username
exports.findUserByUsername = async (username) => {
    try {
        // Find the user in the database
        const [users] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        return users[0]; // Return the first user found
    } catch (err) {
        console.error('Error finding user:', err);
        return null;
    }
};

// Function to compare passwords
exports.comparePasswords = async (password, hashedPassword) => {
    try {
        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        return passwordMatch;
    } catch (err) {
        console.error('Error comparing passwords:', err);
        return false;
    }
};

module.exports = connection;
