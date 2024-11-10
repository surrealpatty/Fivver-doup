"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// serviceRoute.js
const express_1 = __importDefault(require("express"));
const authMiddleware_js_1 = require("../middlewares/authMiddleware.js"); // Make sure you're using correct imports
const serviceController_js_1 = require("../controllers/serviceController.js"); // Correct import for named exports
const router = express_1.default.Router();
// Route for creating a service (only authenticated users can create a service)
router.post('/create', authMiddleware_js_1.authMiddleware, serviceController_js_1.createService);
// Route for getting all services or a user's services
router.get('/', serviceController_js_1.getServices);
// Route for updating a service (only the user who created the service can update it)
router.put('/:id', authMiddleware_js_1.authMiddleware, (0, authMiddleware_js_1.authorizeRoles)('user', 'admin'), serviceController_js_1.updateService);
// Route for deleting a service (only the user who created the service can delete it)
router.delete('/:id', authMiddleware_js_1.authMiddleware, (0, authMiddleware_js_1.authorizeRoles)('user', 'admin'), serviceController_js_1.deleteService);
exports.default = router;
//# sourceMappingURL=serviceRoute.js.map