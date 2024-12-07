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
const services_1 = __importDefault(require("../models/services")); // Import the interface and class
const user_1 = require("../models/user"); // Correct named import for User
const database_1 = require("../config/database"); // Import the sequelize instance
describe('Service Model Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Sync the database (ensure it's ready before tests)
        yield database_1.sequelize.sync({ force: true });
    }));
    it('should create a new service', () => __awaiter(void 0, void 0, void 0, function* () {
        // Create a user with all required fields (password and role)
        const user = yield user_1.User.create({
            username: 'testUser',
            email: 'test@example.com',
            password: 'testPassword123',
            role: 'free', // Ensure role is provided
        });
        // Prepare the service data with the correct type
        const serviceData = {
            name: 'Test Service', // Add the missing name property
            title: 'Test Service Title',
            description: 'A test service description',
            price: 100.0,
            userId: user.id, // Associate the service with the created user
        };
        // Create the service and ensure it's properly typed
        const service = yield services_1.default.create(serviceData);
        // Check that the service has the correct properties
        expect(service.userId).toBe(user.id);
        expect(service.title).toBe('Test Service Title');
        expect(service.name).toBe('Test Service'); // Verify the name field
        expect(service.price).toBe(100.0);
    }));
});
