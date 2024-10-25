const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // Make sure you have bcrypt installed for password hashing
const { User } = require('../models/user'); // Adjust the path as necessary

// User login function
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare the password with the stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Create and sign the JWT token
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expiration time
        });

        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

