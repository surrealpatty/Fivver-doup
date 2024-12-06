"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import path
const router = (0, express_1.Router)();
router.post('/services', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Service created successfully' });
        return; // Explicitly return void to match function signature
    }
    catch (error) {
        next(error); // Pass errors to the next error-handling middleware
    }
});
router.get('/profile', authMiddleware_1.authenticateJWT, async (req, res, next) => {
    try {
        res.status(200).json({ profile: req.user }); // Access `req.user` safely
        return; // Explicitly return void to match function signature
    }
    catch (error) {
        next(error); // Pass errors to the next error-handling middleware
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map