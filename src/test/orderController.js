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
const database_1 = require("../config/database"); // Correct named import
const order_1 = __importDefault(require("../models/order"));
const user_1 = __importDefault(require("../models/user"));
const services_1 = __importDefault(require("../models/services"));
const supertest_1 = __importDefault(require("supertest")); // Assuming you're using supertest for API testing
const index_1 = require("../index"); // Now exporting 'app' from the index file
// Mock models with correct types
jest.mock('../models/user');
jest.mock('../models/services');
jest.mock('../models/order');
// Mocking methods for Sequelize models
const mockFindByPk = jest.fn();
const mockFindAll = jest.fn();
user_1.default.findByPk = mockFindByPk;
services_1.default.findByPk = mockFindByPk;
order_1.default.findByPk = mockFindByPk;
order_1.default.findAll = mockFindAll;
describe('Order Controller', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Setup database before tests (optional depending on your test environment)
        yield database_1.sequelize.sync({ force: true }); // Create tables and reset data
    }));
    beforeEach(() => {
        // Reset mocks before each test to ensure clean slate for tests
        jest.resetAllMocks();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clean up after tests
        yield database_1.sequelize.close();
    }));
    // Test createOrder
    describe('POST /orders', () => {
        it('should create a new order successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            // Mock User and Service findByPk
            mockFindByPk.mockResolvedValueOnce({ id: 1, name: 'Test User' }); // Mock User found
            mockFindByPk.mockResolvedValueOnce({ id: 1, name: 'Test Service' }); // Mock Service found
            const response = yield (0, supertest_1.default)(index_1.app)
                .post('/orders')
                .send({
                userId: 1,
                serviceId: 1,
                orderDetails: 'Test order details',
            });
            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Order created successfully');
            expect(response.body.order).toHaveProperty('userId', 1);
            expect(response.body.order).toHaveProperty('serviceId', 1);
        }));
        it('should return 404 if user or service not found', () => __awaiter(void 0, void 0, void 0, function* () {
            mockFindByPk.mockResolvedValueOnce(null); // User not found
            mockFindByPk.mockResolvedValueOnce({ id: 1, name: 'Test Service' }); // Mock Service found
            const response = yield (0, supertest_1.default)(index_1.app)
                .post('/orders')
                .send({
                userId: 1,
                serviceId: 1,
                orderDetails: 'Test order details',
            });
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User or Service not found');
        }));
    });
    // Other test cases as needed...
});
