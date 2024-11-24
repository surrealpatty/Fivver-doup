"use strict";
// src/controllers/serviceController.ts
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
exports.getServiceProfile = void 0;
const services_1 = __importDefault(require("../models/services")); // Correct import
/**
 * Get the service profile for the authenticated user.
 * @param req - Request object, including user information from JWT.
 * @param res - Response object.
 * @returns The service data or an error message.
 */
const getServiceProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Ensure user object exists and has a valid id
        const user = req.user;
        if (!user || !user.id || typeof user.id !== 'string') {
            return res.status(400).json({ message: 'Invalid or missing User ID in request' });
        }
        const userId = user.id;
        // Attempt to fetch the service linked to the userId
        const service = yield services_1.default.findOne({ where: { userId } });
        // If no service is found for the given userId, return a 404 error
        if (!service) {
            return res.status(404).json({ message: 'Service not found for the given user' });
        }
        // If the service is found, return it in the response
        return res.json(service);
    }
    catch (error) {
        // Log detailed error for debugging
        console.error('Error fetching service profile:', error);
        // Return a generic server error response
        return res.status(500).json({ message: 'Internal server error fetching service profile' });
    }
});
exports.getServiceProfile = getServiceProfile;
