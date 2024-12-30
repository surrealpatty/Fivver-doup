// src/middlewares/tierRestriction.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "tierMiddleware", {
    enumerable: true,
    get: function() {
        return tierMiddleware;
    }
});
const tierMiddleware = (req, res, next)=>{
    const user = req.user;
    // Check if the user exists and if their tier is 'paid'
    if (!user || user.tier !== 'paid') {
        res.status(403).json({
            message: 'Access restricted to paid users only.'
        });
        return; // Make sure the function exits after sending the response
    }
    // Proceed to the next middleware if the user is paid
    next();
};

//# sourceMappingURL=tierRestriction.js.map