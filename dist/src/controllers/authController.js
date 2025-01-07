"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticateUser", {
    enumerable: true,
    get: function() {
        return authenticateUser;
    }
});
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _user = require("../models/user");
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Function to generate JWT token
const generateToken = (user)=>{
    return _jsonwebtoken.default.sign({
        userId: user.id,
        email: user.email,
        username: user.username
    }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '1h'
    } // Token expires in 1 hour
    );
};
const authenticateUser = async (req, res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required.'
        });
    }
    try {
        // Check if the user exists
        const user = await _user.User.findOne({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        // Check if the password matches
        const isMatch = await _bcryptjs.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }
        // Generate a JWT token
        const token = generateToken(user);
        // Return the user and the token with a 200 status code (success)
        return res.status(200).json({
            message: 'Authentication successful',
            token
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
