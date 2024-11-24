"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express and the types for request and response
const review_1 = __importDefault(require("./review")); // Correct import path for Review.ts (router in Review.ts)
const user_1 = __importDefault(require("./user")); // Ensure userRouter is properly defined and exported as a router
const service_1 = __importDefault(require("./service")); // Correct import path for service.ts (router in service.ts)
// Create an instance of the router
const router = express_1.default.Router();
// Define routes
router.use('/api/reviews', review_1.default); // Use reviewRouter for /api/reviews endpoint
router.use('/api/users', user_1.default); // Use userRouter for /api/users endpoint
router.use('/api/services', service_1.default); // Use serviceRouter for /api/services endpoint
// Optional: Health check route
router.get('/health', (_req, res) => {
    res.json({ message: 'API is running' });
});
// Export the router
exports.default = router;
