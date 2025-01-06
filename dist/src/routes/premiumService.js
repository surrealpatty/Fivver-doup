"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const premiumServiceRoutes = express_1.default.Router();
// Define your routes here
premiumServiceRoutes.get('/', (req, res) => {
    res.status(200).send('Premium service route');
});
// Export the routes as a default export
exports.default = premiumServiceRoutes; // Default export
