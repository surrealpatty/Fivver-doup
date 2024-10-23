// middleware/authMiddleware.js

const auth = require('./auth');

exports.isAuthenticated = (req, res, next) => {
    auth.verifyToken(req, res, next); // Use the verifyToken middleware to check if the user is authenticated
};

exports.isAdmin = (req, res, next) => {
    // Here you can implement additional logic to check if the user is an admin
    // For example, if you have a role property on your user model:
    
    // Simulating user role check; replace this with actual role fetching logic
    const userRole = req.userRole; // Assume you set userRole after authentication

    if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Require Admin Role!' });
    }

    next(); // Proceed to the next middleware or route handler
};
