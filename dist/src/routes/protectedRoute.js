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
const _authenticateToken = require("../middlewares/authenticateToken");
const router = (0, _express.Router)();
// Protected route example
router.get('/protected', _authenticateToken.authenticateToken, async (req, res, next)=>{
    try {
        // Ensure req.user is available, as it's injected by authenticateToken middleware
        if (!req.user) {
            // Return early if `user` is not present
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }
        const { id, email, username } = req.user;
        // Return the protected route response with user data
        return res.status(200).json({
            message: 'Protected route accessed',
            user: {
                id,
                email,
                username
            }
        });
    } catch (error) {
        // Return error response instead of calling next(error)
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});
const _default = router;
