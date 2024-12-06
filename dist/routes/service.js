"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceController_1 = require("../controllers/serviceController"); // Import the controller to handle the service update
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Import the authentication middleware
const router = express_1.default.Router();
// Add a PUT route for updating services
router.put('/services/:id', authMiddleware_1.authenticateJWT, serviceController_1.updateService);
exports.default = router;
//# sourceMappingURL=service.js.map