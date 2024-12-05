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
const _authController = require("../controllers/authController");
const router = (0, _express.Router)();
// Registration Route
router.post('/register', async (req, res)=>{
    try {
        await (0, _authController.registerUser)(req, res); // Use the registerUser function from the controller
    } catch (error) {
        res.status(500).json({
            message: 'Server error during user registration.'
        });
    }
});
// Login Route
router.post('/login', async (req, res)=>{
    try {
        await (0, _authController.loginUser)(req, res); // Use the loginUser function from the controller
    } catch (error) {
        res.status(500).json({
            message: 'Server error during login.'
        });
    }
});
const _default = router;

//# sourceMappingURL=user.js.map