"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createService = void 0;
const services_1 = __importDefault(require("../models/services")); // Named import of the Service model
const createService = async (req, res) => {
    try {
        const { title, description, price, userId } = req.body;
        const newService = await services_1.default.create({
            title,
            description,
            price,
            userId
        });
        res.status(201).json(newService);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating service', error });
    }
};
exports.createService = createService;
//# sourceMappingURL=serviceController.js.map