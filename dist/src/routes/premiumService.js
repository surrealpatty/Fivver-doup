"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Correct import for express
const authenticateToken_1 = require("../middlewares/authenticateToken");
const router = express_1.default.Router();
// Define the premium service route with authentication
router.get('/premium-service', authenticateToken_1.authenticateToken, (req, res) => {
    // Check if the user object exists and if the user has a 'paid' tier
    if (req.user?.tier === 'paid') {
        // If the user is paid, grant access
        res.status(200).json({ message: 'Premium service access granted.' });
    }
    else if (req.user) {
        // If the user is logged in but not a paid user
        res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
    }
    else {
        // If the user is not logged in
        res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
});
exports.default = router;
