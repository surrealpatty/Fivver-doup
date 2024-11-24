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
exports.checkAuth = void 0;
const express_1 = require("express"); // Import necessary types from express
const models_1 = require("../models"); // Correct the import paths to your models
var authMiddleware_1 = require("../middlewares/authMiddleware");
Object.defineProperty(exports, "checkAuth", { enumerable: true, get: function () { return authMiddleware_1.checkAuth; } });
const router = (0, express_1.Router)(); // Initialize the router
/**
 * POST /services
 * Route to create a new service
 */
router.post('/services', checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure and type the incoming request body
        const { userId, title, description, price } = req.body;
        // Validate required fields
        if (!userId || !title || !description || price === undefined) {
            res.status(400).json({
                message: 'Missing required fields: userId, title, description, and price are mandatory.',
                error: 'ValidationError',
            });
            return; // Ensure we return early if validation fails
        }
        // Validate price
        if (typeof price !== 'number' || price <= 0 || isNaN(price)) {
            res.status(400).json({
                message: 'Invalid price: must be a positive number.',
                error: 'ValidationError',
            });
            return; // Ensure we return early if validation fails
        }
        // Check if the user exists (We can get userId from req.user after checkAuth middleware)
        const user = yield models_1.User.findByPk(userId);
        if (!user) {
            res.status(404).json({
                message: `User with ID ${userId} not found.`,
                error: 'NotFoundError',
            });
            return; // Ensure we return early if the user does not exist
        }
        // Create the new service
        const service = yield models_1.Service.create({
            userId, // User ID associated with the service
            title, // Service title
            description, // Service description
            price, // Service price
        });
        // Return only necessary information to the client
        res.status(201).json({
            message: 'Service created successfully.',
            serviceId: service.id,
            title: service.title,
        });
    }
    catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            message: 'Internal server error while creating the service.',
            error: error instanceof Error ? error.message : 'UnknownError',
        });
    }
}));
exports.default = router;
