"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController"); // Import both registerUser and loginUser
const router = (0, express_1.Router)();
// Registration Route
router.post('/register', async (req, res) => {
    try {
        await (0, authController_1.registerUser)(req, res); // Use the registerUser function from the controller
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during user registration.' });
    }
});
// Login Route
router.post('/login', async (req, res) => {
    try {
        await (0, authController_1.loginUser)(req, res); // Use the loginUser function from the controller
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during login.' });
    }
});
exports.default = router;
//# sourceMappingURL=user.js.map