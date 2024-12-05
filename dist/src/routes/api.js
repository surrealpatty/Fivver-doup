// src/routes/api.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _express = require("express");
const _authMiddleware = require("../middlewares/authMiddleware");
const router = (0, _express.Router)();
router.post('/services', _authMiddleware.authenticateJWT, async (req, res)=>{
    if (!req.user) {
        res.status(403).json({
            message: 'User not authenticated'
        });
        return; // Ensure flow terminates after returning the response
    }
    if (!req.user.tier) {
        res.status(400).json({
            message: 'User tier is missing'
        });
        return; // Ensure flow terminates after returning the response
    }
    // Proceed with creating or updating the service logic here...
    res.status(201).json({
        message: 'Service created successfully'
    });
});

//# sourceMappingURL=api.js.map