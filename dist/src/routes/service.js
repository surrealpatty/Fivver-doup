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
// Example middleware to check user roles
const checkRole = (role)=>{
    return (req, res, next)=>{
        const user = req.user; // Type the user as UserPayload
        const userRole = user.role; // Now TypeScript knows that user has a 'role' property
        if (userRole !== role) {
            return res.status(403).json({
                message: 'Access denied. Only paid users can access this service.'
            });
        }
        next();
    };
};
// Premium service route for paid users only
router.get('/premium', _authenticateToken.authenticateToken, checkRole('Paid'), (req, res)=>{
    res.status(200).json({
        message: 'Premium service access granted.'
    });
});
const _default = router;
