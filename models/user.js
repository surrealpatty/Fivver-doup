const express = require('express');
const router = express.Router();
const { Model: User } = require('../models/user'); // Ensure the path is correct
const { check, validationResult } = require('express-validator');

// Middleware for validation
const validateUser = [
    check('username')
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters long'),
    check('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];

// Create a new user
router.post('/', validateUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({ user });
    } catch (error) {
        console.error('Error creating user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error retrieving user', error: error.message });
    }
});

// Update a user
router.put('/:id', validateUser, async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id }
        });

        if (!updated) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUser = await User.findByPk(req.params.id);
        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await User.destroy({
            where: { id: req.params.id }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(204).send(); // 204 No Content
    } catch (error) {
        console.error('Error deleting user:', error); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

// Export the router
module.exports = router;
