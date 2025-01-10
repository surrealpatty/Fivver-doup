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
// Define the protected route with authentication
router.get('/protected-route', _authenticateToken.authenticateToken, async (req, res, next)=>{
    try {
        // Type assertion to CustomAuthRequest to access req.user
        const customReq = req;
        // Ensure req.user is available, as it's injected by authenticateToken middleware
        if (!customReq.user) {
            // Return early if user is not present
            res.status(401).json({
                error: 'Unauthorized'
            });
            return; // Prevent further code execution
        }
        const { id, email, username } = customReq.user;
        // Send the response without returning the Response object
        res.status(200).json({
            message: 'Protected route accessed',
            user: {
                id,
                email,
                username
            }
        });
    // No need to return the response object from here
    } catch (error) {
        // Return error response instead of calling next(error)
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
});
const _default = router;
