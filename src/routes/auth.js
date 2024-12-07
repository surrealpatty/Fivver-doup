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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController"); // Import controller functions
const router = (0, express_1.Router)();
// Registration Route
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.registerUser)(req, res); // Call the registerUser function from the controller
    }
    catch (error) {
        console.error('Registration error:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error during user registration.' });
    }
}));
// Login Route
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, authController_1.loginUser)(req, res); // Call the loginUser function from the controller
    }
    catch (error) {
        console.error('Login error:', error); // Log error for debugging
        res.status(500).json({ message: 'Server error during login.' });
    }
}));
exports.default = router;
