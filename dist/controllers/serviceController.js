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
exports.deleteService = exports.updateService = exports.getServices = exports.createService = void 0;
const services_js_1 = __importDefault(require("../models/services.js")); // Ensure correct model path
// 1. Create a Service
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, price, category } = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id; // Ensure req.user exists
    if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
    }
    try {
        const newService = yield services_js_1.default.create({
            title,
            description,
            price,
            category,
            userId,
        });
        return res.status(201).json(newService);
    }
    catch (error) {
        console.error('Error creating service:', error);
        return res.status(500).json({ message: 'Error creating service', error: error.message });
    }
});
exports.createService = createService;
// 2. Read Services (fetch all or by user)
const getServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.query;
    try {
        const services = userId
            ? yield services_js_1.default.findAll({ where: { userId } })
            : yield services_js_1.default.findAll();
        return res.status(200).json(services);
    }
    catch (error) {
        console.error('Error fetching services:', error);
        return res.status(500).json({ message: 'Error fetching services', error: error.message });
    }
});
exports.getServices = getServices;
// 3. Update a Service
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { title, description, price, category } = req.body;
    try {
        const service = yield services_js_1.default.findOne({ where: { id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        yield service.update({ title, description, price, category });
        return res.status(200).json(service);
    }
    catch (error) {
        console.error('Error updating service:', error);
        return res.status(500).json({ message: 'Error updating service', error: error.message });
    }
});
exports.updateService = updateService;
// 4. Delete a Service
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    try {
        const service = yield services_js_1.default.findOne({ where: { id, userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }
        yield service.destroy();
        return res.status(200).json({ message: 'Service deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting service:', error);
        return res.status(500).json({ message: 'Error deleting service', error: error.message });
    }
});
exports.deleteService = deleteService;
//# sourceMappingURL=serviceController.js.map