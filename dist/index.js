"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = __importDefault(require("./models/user")); // Path to the User model
const services_1 = __importDefault(require("./models/services")); // Path to the Service model
const user_2 = __importDefault(require("./routes/user")); // User-related routes
const service_1 = __importDefault(require("./routes/service")); // Service-related routes
const dotenv_1 = __importDefault(require("dotenv")); // To load environment variables
// Initialize environment variables
dotenv_1.default.config();
// Initialize Sequelize instance with database connection
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'fivver_doup',
    models: [user_1.default, services_1.default], // Load models
    dialectOptions: {
        charset: 'utf8mb4', // Ensure utf8mb4 is used for encoding
    },
});
// Error handling for database connection
sequelize.authenticate()
    .then(() => {
    console.log('Database connection established successfully');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit with error if the connection fails
});
// Add associations after the models are initialized
services_1.default.belongsTo(user_1.default, { foreignKey: 'userId' });
user_1.default.hasMany(services_1.default, { foreignKey: 'userId' });
// Initialize Express application
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Root route to confirm server is running
app.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running');
});
// Mount user routes at /api/users
app.use('/api/users', user_2.default);
// Mount service routes at /api/services
app.use('/api/services', service_1.default);
// Sync the database and start the server if not in a test environment
sequelize.sync()
    .then(() => {
    if (process.env.NODE_ENV !== 'test') {
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
})
    .catch((error) => {
    console.error('Error syncing the database:', error);
    process.exit(1); // Exit with error if sync fails
});
