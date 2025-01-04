"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.server = void 0;
// src/index.ts
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("./config/sequelize"); // Ensure the correct path
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return sequelize_1.sequelize; } });
const premiumService_1 = __importDefault(require("./routes/premiumService")); // Ensure the correct path
const user_1 = __importDefault(require("./routes/user")); // Ensure the correct path
const service_1 = __importDefault(require("./routes/service")); // Ensure the correct path
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Register the premium service route
app.use('/premium-service', premiumService_1.default);
// Register other routes
app.use('/api/users', user_1.default); // Mount user routes
app.use('/api/services', service_1.default); // Mount service routes
// Root route to confirm server is running
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running');
});
// Start the server on port 3000 (or from environment variables)
const server = app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
exports.server = server;
// Default export for app to be used in tests and other files
exports.default = app; // Default export for app
