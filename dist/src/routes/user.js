"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _user = require("../models/user");
const _validateRegistration = require("../middlewares/validateRegistration");
const router = (0, _express.Router)();
router.post('/register', _validateRegistration.validateRegistration, async (req, res)=>{
    const { email, username, password } = req.body;
    // Check if all required fields are present
    if (!email) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Email is required'
                }
            ]
        });
    }
    if (!username) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Username is required'
                }
            ]
        });
    }
    if (!password) {
        return res.status(400).json({
            errors: [
                {
                    msg: 'Password is required'
                }
            ]
        });
    }
    try {
        // Include additional required fields like 'role', 'tier', and 'isVerified' when creating the user
        const user = await _user.User.create({
            email,
            username,
            password,
            role: 'user',
            tier: 'free',
            isVerified: false
        });
        return res.status(201).json(user); // Respond with the created user
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error'
        }); // Handle internal errors
    }
});
const _default = router;

//# sourceMappingURL=user.js.map