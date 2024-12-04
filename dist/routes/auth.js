"use strict";
// src/routes/auth.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController"); // Correctly import registerUser
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        await (0, authController_1.registerUser)(req, res);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error during user registration.' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map