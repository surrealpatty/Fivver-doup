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
const database_1 = require("../config/database");
const user_1 = require("../models/user");
const services_1 = __importDefault(require("../models/services"));
const order_1 = require("../models/order");
const index_1 = require("../../src/index");
jest.mock('../models/services', () => ({
    findByPk: jest.fn(),
}));
jest.mock('../models/user', () => ({
    findByPk: jest.fn(),
}));
jest.mock('../models/order', () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
}));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.sync({ force: true });
    }
    catch (error) {
        console.error('Error syncing database:', error);
        throw error;
    }
}));
afterEach(() => {
    jest.clearAllMocks();
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.close();
}));
describe('Order Controller Tests', () => {
    it('should create a new order', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        const mockService = { id: 1, name: 'Test Service' };
        user_1.User.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        order_1.Order.create.mockResolvedValueOnce({
            id: 1,
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
            status: 'Pending',
        });
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
        expect(response.body.order.status).toBe('Pending');
        expect(order_1.Order.create).toHaveBeenCalledWith({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
    }));
    it('should return an error if user is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockService = { id: 1, name: 'Test Service' };
        user_1.User.findByPk.mockResolvedValueOnce(null);
        services_1.default.findByPk.mockResolvedValueOnce(mockService);
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: 999,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    }));
    it('should return an error if service is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, username: 'testuser', email: 'user@example.com' };
        user_1.User.findByPk.mockResolvedValueOnce(mockUser);
        services_1.default.findByPk.mockResolvedValueOnce(null);
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: 999,
            orderDetails: 'Test order details',
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    }));
});
