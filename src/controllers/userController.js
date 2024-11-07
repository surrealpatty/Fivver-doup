const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // For date comparisons

// 1. Register a new user
exports.registerUser = async (req, res) => {
    const { username, email, password, role = 'Free' } = req.body;  // Default role to 'Free'

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required' });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            role  // Save the role as either 'Free' or 'Paid'
        });

        const { password: _, ...userWithoutPassword } = newUser.toJSON();
        return res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

// 2. User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role, subscriptionStatus: user.subscriptionStatus },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({ message: 'Login successful', token, role: user.role, subscriptionStatus: user.subscriptionStatus });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ message: 'Error logging in user', error: error.message });
    }
};

// 3. Upgrade to Paid Subscription
exports.upgradeToPaid = async (req, res) => {
    const userId = req.user.id;  // Ensure user ID comes from a verified JWT token
    const durationInMonths = req.body.duration || 1; // Default to 1 month

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const startDate = new Date();
        const endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + durationInMonths);

        // Update user's subscription status and dates
        user.role = 'Paid';
        user.subscriptionStatus = 'Active';
        user.subscriptionStartDate = startDate;
        user.subscriptionEndDate = endDate;

        await user.save();

        return res.status(200).json({ message: 'Subscription upgraded to Paid', subscriptionEndDate: endDate });
    } catch (error) {
        console.error('Error upgrading subscription:', error);
        return res.status(500).json({ message: 'Error upgrading subscription', error: error.message });
    }
};

// 4. Check Subscription Status (middleware can use this as needed)
exports.checkSubscriptionStatus = async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const currentDate = new Date();
        if (user.subscriptionEndDate && user.subscriptionEndDate < currentDate) {
            // If the subscription has expired, revert to Free
            user.role = 'Free';
            user.subscriptionStatus = 'Inactive';
            await user.save();
        }

        return res.status(200).json({
            message: 'Subscription status retrieved successfully',
            subscriptionStatus: user.subscriptionStatus,
            subscriptionEndDate: user.subscriptionEndDate,
        });
    } catch (error) {
        console.error('Error checking subscription status:', error);
        return res.status(500).json({ message: 'Error checking subscription status', error: error.message });
    }
};
