"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkTier", {
    enumerable: true,
    get: function() {
        return checkTier;
    }
});
const checkTier = (tier)=>{
    return (req, res, next)=>{
        // Check if the user exists and if the user has the required tier
        if (req.user?.tier !== tier) {
            res.status(403).json({
                message: 'Forbidden: You need to be on the appropriate tier.'
            });
            return; // Stop further processing, but do not return a value
        }
        // If tier matches, proceed to the next middleware/handler
        next();
    };
};

//# sourceMappingURL=tierMiddleware.js.map