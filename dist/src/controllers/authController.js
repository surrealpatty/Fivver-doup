// src/controllers/authController.ts
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
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _jwt = require("../utils/jwt");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authenticateUser = async (req, res)=>{
    const { email, password } = req.body;
    // Ensure email and password are provided
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required.'
        });
    }
    try {
        // Check if the user exists in the database
        const user = await _user.default.findOne({
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
        // Create the user payload for the token (exclude password)
        const userPayload = {
            id: String(user.id),
            email: user.email,
            username: user.username,
            tier: user.tier,
            role: user.role
        };
        // Generate the JWT token for the user
        const token = (0, _jwt.generateToken)(userPayload);
        // Return the success message and the generated token with a 200 status code
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
