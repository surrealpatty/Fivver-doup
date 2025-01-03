"use strict";
// src/routes/dashboard.ts
Object.defineProperty(exports, "__esModule", { value: true });
// Handler for the dashboard route
const dashboardHandler = (req, res) => {
    // Safely cast req.user to UserPayload (since we know it's added by the authentication middleware)
    const user = req.user;
    // Return a JSON response with the user information
    res.json({ user });
};
exports.default = dashboardHandler;
