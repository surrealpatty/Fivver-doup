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
const checkTier = (requiredTier)=>{
    return (req, res, next)=>{
        // Check if the user's tier matches the required tier
        if (req.user?.tier !== requiredTier) {
            res.status(403).json({
                message: `Access restricted to ${requiredTier} users only.`
            });
            return; // Explicitly return after sending a response
        }
        next();
    };
};

//# sourceMappingURL=tierMiddleware.js.map