"use strict";
// src/routes/serviceRoute.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var services_1 = require("../models/services"); // Import Service model
var user_1 = require("../models/user"); // Import User model (to check user existence)
var router = express_1.default.Router();
// CREATE: Add a new service
router.post('/services', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userId, title, description, price, user, service, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, userId = _a.userId, title = _a.title, description = _a.description, price = _a.price;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_1.default.findByPk(userId)];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({ message: 'User not found' })];
                }
                return [4 /*yield*/, services_1.default.create({
                        userId: userId,
                        title: title, // 'title' instead of 'name'
                        description: description,
                        price: price,
                    })];
            case 3:
                service = _b.sent();
                // Return the newly created service
                return [2 /*return*/, res.status(201).json(service)];
            case 4:
                error_1 = _b.sent();
                console.error('Error creating service:', error_1);
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// READ: Get all services
router.get('/services', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var services, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, services_1.default.findAll({
                        include: [
                            {
                                model: user_1.default,
                                as: 'user', // Ensure this matches the alias in your Service model association
                                attributes: ['id', 'username'],
                            },
                        ],
                    })];
            case 1:
                services = _a.sent();
                return [2 /*return*/, res.status(200).json(services)];
            case 2:
                error_2 = _a.sent();
                console.error('Error fetching services:', error_2);
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 3: return [2 /*return*/];
        }
    });
}); });
// READ: Get a specific service by ID
router.get('/services/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, serviceId, service, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                serviceId = parseInt(id, 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, services_1.default.findOne({
                        where: { id: serviceId },
                        include: [
                            {
                                model: user_1.default,
                                as: 'user', // Ensure this matches the alias in your Service model association
                                attributes: ['id', 'username'],
                            },
                        ],
                    })];
            case 2:
                service = _a.sent();
                if (!service) {
                    return [2 /*return*/, res.status(404).json({ message: 'Service not found' })];
                }
                return [2 /*return*/, res.status(200).json(service)];
            case 3:
                error_3 = _a.sent();
                console.error('Error fetching service:', error_3);
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 4: return [2 /*return*/];
        }
    });
}); });
// UPDATE: Update a service
router.put('/services/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, serviceId, _a, title, description, price, service, error_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                serviceId = parseInt(id, 10);
                _a = req.body, title = _a.title, description = _a.description, price = _a.price;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, services_1.default.findByPk(serviceId)];
            case 2:
                service = _b.sent();
                if (!service) {
                    return [2 /*return*/, res.status(404).json({ message: 'Service not found' })];
                }
                // Update the service fields
                service.title = title || service.title;
                service.description = description || service.description;
                service.price = price || service.price;
                return [4 /*yield*/, service.save()];
            case 3:
                _b.sent(); // Save the updated service
                return [2 /*return*/, res.status(200).json(service)];
            case 4:
                error_4 = _b.sent();
                console.error('Error updating service:', error_4);
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
// DELETE: Delete a service
router.delete('/services/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, serviceId, service, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                serviceId = parseInt(id, 10);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, services_1.default.findByPk(serviceId)];
            case 2:
                service = _a.sent();
                if (!service) {
                    return [2 /*return*/, res.status(404).json({ message: 'Service not found' })];
                }
                return [4 /*yield*/, service.destroy()];
            case 3:
                _a.sent(); // Delete the service
                return [2 /*return*/, res.status(204).send()]; // Return no content (204) status after deletion
            case 4:
                error_5 = _a.sent();
                console.error('Error deleting service:', error_5);
                return [2 /*return*/, res.status(500).json({ message: 'Internal server error' })];
            case 5: return [2 /*return*/];
        }
    });
}); });
exports.default = router; // Export the router to use in the app
