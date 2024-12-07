"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create a router instance for handling service-related routes
const serviceRouter = express_1.default.Router();
// Define your service-related routes here
serviceRouter.get('/', (req, res) => {
    res.send('Service routes');
});
// Export the router as the default export
exports.default = serviceRouter;
