const express = require('express');
const router = express.Router();
const { Model: User } = require('../models/user'); // Adjust path as necessary
const { check, validationResult } = require('express-validator');

// Create a new user
router.post('/', [
    check('username').isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters long'),
    check('email').isEmail().withMessage('Please provide a valid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
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
        res.status(500).json({ message: 'Error retrieving user', error });
    }
});

// Update a user
router.put('/:id', async (req, res) => {
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
        res.status(500).json({ message: 'Error updating user', error });
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

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
});

// Export the router
module.exports = router;
