// src/routes/auth.ts
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
router.post('/register', async (req, res)=>{
    try {
        await (0, _authController.registerUser)(req, res);
    } catch (error) {
        res.status(500).json({
            message: 'Server error during user registration.'
        });
    }
});
const _default = router;

//# sourceMappingURL=auth.js.map