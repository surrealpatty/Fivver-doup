// src/middlewares/tierRestriction.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "checkPaidTier", {
    enumerable: true,
    get: function() {
        return checkPaidTier;
    }
});
const checkPaidTier = (req, res, next)=>{
    // Ensure that req.user is defined before accessing its properties
    if (!req.user || req.user.tier !== 'paid') {
        return res.status(403).json({
            message: 'Access restricted to paid tier users.'
        });
    }
    next();
};

//# sourceMappingURL=tierRestriction.js.map