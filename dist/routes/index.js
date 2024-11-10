"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // Import express
const reviews_js_1 = __importDefault(require("./reviews.js")); // Import the reviews router
const user_js_1 = __importDefault(require("./user.js")); // Import the user router
const servicesRoute_js_1 = __importDefault(require("./servicesRoute.js")); // Import the services router
// Create an instance of the router
const router = express_1.default.Router();
// Define routes
router.use('/api/reviews', reviews_js_1.default); // Use reviews router for /api/reviews endpoint
router.use('/api/users', user_js_1.default); // Use user router for /api/users endpoint
router.use('/api/services', servicesRoute_js_1.default); // Use services router for /api/services endpoint
// Optional: Health check route
router.get('/health', (req, res) => {
    res.json({ message: 'API is running' });
});
// Export the router
exports.default = router;
//# sourceMappingURL=index.js.map