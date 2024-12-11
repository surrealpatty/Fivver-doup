"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api.ts
const express_1 = require("express");
const checkAuth_1 = require("../middlewares/checkAuth"); // Assuming checkAuth is in the middlewares folder
const router = (0, express_1.Router)();
// Example route that requires authentication
router.get('/some-endpoint', checkAuth_1.checkAuth, (req, res) => {
    // Now req.user should be available and correctly typed
    if (req.user) {
        // Respond with the user information
        res.status(200).json({ message: 'Authenticated', user: req.user });
    }
    else {
        // In case req.user is not available (which should not happen if the middleware works correctly)
        res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.default = router;
//# sourceMappingURL=api.js.map