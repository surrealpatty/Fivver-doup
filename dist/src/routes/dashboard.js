// src/routes/dashboard.ts
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
// Handler for the dashboard route
const dashboardHandler = (req, res)=>{
    // Safely cast req.user to UserPayload (since we know it's added by the authentication middleware)
    const user = req.user;
    // Return a JSON response with the user information
    res.json({
        user
    });
};
const _default = dashboardHandler;
