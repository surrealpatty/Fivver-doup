// src/controllers/authController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerUser", {
    enumerable: true,
    get: function() {
        return registerUser;
    }
});
const _bcrypt = /*#__PURE__*/ _interop_require_default(require("bcrypt"));
const _user = require("../models/user");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const registerUser = async (req, res)=>{
    const { email, username, password } = req.body;
    // Input validation
    if (!email || !username || !password) {
        return res.status(400).json({
            message: 'Please provide all fields'
        });
    }
    // Check if user already exists
    const existingUser = await _user.User.findOne({
        where: {
            email
        }
    });
    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists'
        });
    }
    // Hash the password
    const hashedPassword = await _bcrypt.default.hash(password, 10);
    // Create the new user
    try {
        const user = await _user.User.create({
            email,
            username,
            password: hashedPassword
        });
        // Respond with user data (you can exclude the password for security)
        res.status(201).json({
            id: user.id,
            email: user.email,
            username: user.username
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error during registration'
        });
    }
};

//# sourceMappingURL=authController.js.map