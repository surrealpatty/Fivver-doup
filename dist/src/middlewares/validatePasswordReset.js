// src/middlewares/validatePasswordReset.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "validatePasswordReset", {
    enumerable: true,
    get: function() {
        return validatePasswordReset;
    }
});
const validatePasswordReset = (req, res, next)=>{
    const { email, token, newPassword } = req.body;
    // Check if the required fields are present in the request body
    if (!email || !token || !newPassword) {
        return res.status(400).json({
            message: 'Missing required fields: email, token, or newPassword'
        });
    }
    // You can add more validation logic here as needed (e.g., email format validation, password strength check)
    // If validation passes, proceed to the next middleware/controller
    next();
};

//# sourceMappingURL=validatePasswordReset.js.map