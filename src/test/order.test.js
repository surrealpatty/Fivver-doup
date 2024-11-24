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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Ensure this points to the correct entry point for your app
const database_1 = __importDefault(require("../config/database")); // Correct import for Sequelize instance
const user_1 = __importDefault(require("../models/user")); // Correct default import for User model
const services_1 = __importDefault(require("../models/services")); // Correct default import for Service model
const order_1 = __importDefault(require("../models/order")); // Correct default import for Order model
// Mock the models
jest.mock('../models/user', () => ({
    default: {
        findByPk: jest.fn(),
    },
}));
jest.mock('../models/services', () => ({
    default: {
        findByPk: jest.fn(),
    },
}));
jest.mock('../models/order', () => ({
    default: {
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn(),
    },
}));
describe('Order Controller Tests', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.sync({ force: true });
    }));
    afterEach(() => {
        jest.clearAllMocks();
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.close();
    }));
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        const mockService = { id: 1, name: 'Test Service' };
        user_1.default.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        order_1.default.create.mockResolvedValueOnce({
            id: 1,
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
            status: 'Pending',
        });
        const response = yield (0, supertest_1.default)(index_1.default)
            .post('/api/orders')
            .send({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
        expect(response.body.order.status).toBe('Pending');
    }));
    // Continue with other tests...
});
