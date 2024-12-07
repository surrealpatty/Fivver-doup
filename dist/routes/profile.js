"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import for authenticateJWT
const services_1 = __importDefault(require("@models/services")); // Ensure alias for services model is working correctly
const router = (0, express_1.Router)();
// GET route for retrieving user profile and associated services
router.get('/profile', authMiddleware_1.authenticateJWT, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user; // req.user comes from the authenticateJWT middleware
        // Check if the user exists
        if (!user) {
            res.status(403).json({ message: 'User not authenticated' });
            return;
        }
        // Fetch the services associated with the user from the database
        const services = yield services_1.default.findAll({ where: { userId: user.id } });
        // Respond with the user data and the user's services
        res.status(200).json({ user, services });
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        next(error); // Pass the error to the next error handler
    }
}));
exports.default = router; // Correct default export for the router
