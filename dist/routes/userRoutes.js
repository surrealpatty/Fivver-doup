"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const authMiddleware_js_1 = __importDefault(require("../middlewares/authMiddleware.js"));
const router = express_1.default.Router();
// Route to register a new user
router.post('/register', userController_js_1.registerUser);
// Route to log in a user
router.post('/login', userController_js_1.loginUser);
// Route to get the user profile (requires authentication)
router.get('/profile', authMiddleware_js_1.default, userController_js_1.getUserProfile);
// Route to update the user profile (requires authentication)
router.put('/profile', authMiddleware_js_1.default, userController_js_1.updateUserProfile);
// Route to upgrade to a "Paid" subscription (requires authentication)
router.post('/subscription/upgrade', authMiddleware_js_1.default, userController_js_1.upgradeToPaid);
// Route to check the subscription status (requires authentication)
router.get('/subscription/status', authMiddleware_js_1.default, userController_js_1.checkSubscriptionStatus);
// Optional: Health check route to confirm if the route is active
router.get('/health', (req, res) => {
    res.json({ message: 'User routes are active!' });
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map