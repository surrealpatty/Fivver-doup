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
exports.updateService = void 0;
const services_1 = __importDefault(require("@models/services"));
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price } = req.body;
    try {
        const service = yield services_1.default.findByPk(id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        service.name = name !== null && name !== void 0 ? name : service.name;
        service.description = description !== null && description !== void 0 ? description : service.description;
        service.price = price !== null && price !== void 0 ? price : service.price;
        yield service.save();
        res.status(200).json({ message: 'Service updated successfully', service });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Error updating service', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Unknown error occurred' });
        }
    }
});
exports.updateService = updateService;
