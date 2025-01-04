"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.server = void 0;
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("./config/sequelize"); // Ensure the correct path to sequelize config
Object.defineProperty(exports, "sequelize", { enumerable: true, get: function () { return sequelize_1.sequelize; } });
const premiumService_1 = __importDefault(require("./routes/premiumService")); // Ensure the correct path
const user_1 = __importDefault(require("./routes/user")); // Ensure the correct path
const service_1 = __importDefault(require("./routes/service")); // Ensure the correct path
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Register the premium service route
app.use('/api/premium-service', premiumService_1.default); // Mount the route under '/api/premium-service'
// Register other routes
app.use('/api/users', user_1.default); // Mount user routes under '/api/users'
app.use('/api/services', service_1.default); // Mount service routes under '/api/services'
// Root route to confirm server is running
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running');
});
// Port configuration
const PORT = process.env.PORT || 3000;
let server; // Declare a variable to hold the server instance
// Start the server only if the file is not imported as a module
if (!module.parent) {
    exports.server = server = app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
// Default export for app to be used in tests and other files
exports.default = app;
