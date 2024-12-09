"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/profile.ts
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = __importDefault(require("../middlewares/authenticateToken")); // Ensure correct path to authenticateToken middleware
const profileController_1 = require("../controllers/profileController"); // Ensure correct path to profileController
const router = express_1.default.Router();
// GET /profile route to view profile
router.get('/profile', authenticateToken_1.default, profileController_1.getProfile);
// PUT /profile route to update profile
router.put('/profile', authenticateToken_1.default, profileController_1.updateProfile);
exports.default = router;
