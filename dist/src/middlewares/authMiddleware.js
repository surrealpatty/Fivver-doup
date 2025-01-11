// src/middlewares/authMiddleware.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "authenticateUser", {
    enumerable: true,
    get: function() {
        return authenticateUser;
    }
});
const authenticateUser = (req, res, next)=>{
    if (!req.user) {
        // If the user is not authenticated, respond with a 401 status
        res.status(401).json({
            error: 'Unauthorized'
        });
        return; // Ensure the function returns early
    }
    // If the user is authenticated, proceed to the next middleware or route handler
    next();
};
