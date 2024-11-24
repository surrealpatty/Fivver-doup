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
const models_1 = require("../models"); // Correct path to Service model
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Correct import path for auth middleware
const router = (0, express_1.Router)();
// 1. Create a Service
router.post('/', authMiddleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, price } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!title || !description || !price) {
        res.status(400).json({
            message: 'Title, description, and price are required',
            error: 'Invalid input',
        });
        return;
    }
    try {
        if (!userId) {
            res.status(401).json({
                message: 'Authentication required',
            });
            return;
        }
        const service = yield models_1.Service.create({
            userId,
            title,
            description,
            price,
        });
        res.status(201).json({
            message: 'Service created successfully',
            service,
        });
    }
    catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}));
// 2. Get all Services
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield models_1.Service.findAll();
        if (services.length === 0) {
            res.status(404).json({
                message: 'No services found',
            });
            return;
        }
        res.status(200).json({
            message: 'Services fetched successfully',
            services,
        });
    }
    catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}));
// 3. Get a single Service by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const service = yield models_1.Service.findByPk(id);
        if (!service) {
            res.status(404).json({
                message: 'Service not found',
            });
            return;
        }
        res.status(200).json({
            message: 'Service fetched successfully',
            service,
        });
    }
    catch (error) {
        console.error('Error fetching service:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}));
// 4. Update a Service by ID
router.put('/:id', authMiddleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { title, description, price } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    if (!title && !description && !price) {
        res.status(400).json({
            message: 'At least one field is required to update',
            error: 'Invalid input',
        });
        return;
    }
    try {
        if (!userId) {
            res.status(401).json({
                message: 'Authentication required',
            });
            return;
        }
        const service = yield models_1.Service.findByPk(id);
        if (!service) {
            res.status(404).json({
                message: 'Service not found',
            });
            return;
        }
        if (service.userId !== userId) {
            res.status(403).json({
                message: 'Unauthorized to update this service',
            });
            return;
        }
        // Ensure service is treated as an instance
        const serviceInstance = service; // Cast to instance for save method
        if (title)
            serviceInstance.title = title;
        if (description)
            serviceInstance.description = description;
        if (price)
            serviceInstance.price = price;
        yield serviceInstance.save(); // This works since we've cast to the instance
        res.status(200).json({
            message: 'Service updated successfully',
            service: serviceInstance,
        });
    }
    catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}));
// 5. Delete a Service by ID
router.delete('/:id', authMiddleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
    try {
        if (!userId) {
            res.status(401).json({
                message: 'Authentication required',
            });
            return;
        }
        const service = yield models_1.Service.findByPk(id);
        if (!service) {
            res.status(404).json({
                message: 'Service not found',
            });
            return;
        }
        if (service.userId !== userId) {
            res.status(403).json({
                message: 'Unauthorized to delete this service',
            });
            return;
        }
        // Ensure service is treated as an instance
        const serviceInstance = service; // Cast to instance for destroy method
        yield serviceInstance.destroy(); // This works since we've cast to the instance
        res.status(200).json({
            message: 'Service deleted successfully',
        });
    }
    catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({
            message: 'Internal server error',
            error: error.message,
        });
    }
}));
exports.default = router;
