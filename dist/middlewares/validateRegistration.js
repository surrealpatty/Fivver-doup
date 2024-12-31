// Middleware to validate user registration input
export const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;
    // Check if username, email, and password are provided
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Username, email, and password are required.' });
    }
    // Add more validation checks if necessary (e.g., email format, password strength)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }
    // If validation passes, proceed to the next middleware/controller
    next();
};
//# sourceMappingURL=validateRegistration.js.map