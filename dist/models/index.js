"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database"); // Make sure the import path is correct
const models_1 = require("./models"); // Import all models from the models directory
const routes_1 = __importDefault(require("./routes")); // Assuming you have a routes directory
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(routes_1.default); // Assuming routes are set up in the 'routes' directory
// Set up associations for models
const { User, Service, Order } = models_1.models;
// Test the connection and sync the models with the database
database_1.sequelize.authenticate()
    .then(() => {
    console.log('Database connected');
    return database_1.sequelize.sync({ alter: true }); // Sync models if needed (altering existing tables)
})
    .then(() => {
    console.log('Database synced');
})
    .catch((err) => {
    console.error('Database connection failed:', err);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map