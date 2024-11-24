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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database"); // Corrected relative import
const user_1 = __importDefault(require("./models/user")); // Corrected relative import
const services_1 = __importDefault(require("./models/services")); // Corrected relative import
const userController_1 = require("./controllers/userController"); // Corrected relative import
const app = (0, express_1.default)();
exports.app = app;
// Middleware for JSON parsing
app.use(express_1.default.json());
// Setting up model associations
user_1.default.hasMany(services_1.default, { foreignKey: 'userId', as: 'services' });
services_1.default.belongsTo(user_1.default, { foreignKey: 'userId', as: 'user' });
// API routes (you can add more as needed)
app.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, userController_1.registerUser)(req.body); // Call registerUser and pass the request body
        res.status(201).json(user); // Send the created user as the response
    }
    catch (error) {
        next(error); // Pass any errors to the error handler
    }
}));
app.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token, user } = yield (0, userController_1.loginUser)(email, password); // Call loginUser with email and password
        res.status(200).json({ token, user }); // Send the response with token and user data
    }
    catch (error) {
        next(error); // Pass any errors to the error handler
    }
}));
// Function to initialize the database and models
const initializeDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Synchronize models with the database
        yield database_1.sequelize.sync({ force: true }); // Reset database
        console.log('Database synchronized.');
        // Optional: Test data creation (for testing purposes)
        const newUser = yield user_1.default.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });
        console.log('User created:', newUser.toJSON());
        const newService = yield services_1.default.create({
            title: 'Test Service',
            description: 'This is a test service description.',
            price: 100.0,
            category: 'Testing',
            userId: newUser.id, // Pass userId as a number, not a string
        });
        console.log('Service created:', newService.toJSON());
    }
    catch (error) {
        console.error('Error initializing database:', error);
    }
});
// Initialize database on app startup
initializeDatabase();
// You can also start the server if this file is the entry point for your app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
