"use strict";
// src/routes/password.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passwordController_1 = require("../controllers/passwordController");
const validatePasswordReset_1 = require("../middlewares/validatePasswordReset"); // Correct import
const router = express_1.default.Router();
// Route for password reset
router.post('/reset', validatePasswordReset_1.validatePasswordReset, passwordController_1.resetPassword);
exports.default = router;
