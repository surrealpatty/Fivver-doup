"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _order = require("../models/order");
const _database = require("../config/database");
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Mock the methods of the models
jest.mock("../../models/services", ()=>({
        findByPk: jest.fn()
    })); // Mock findByPk method for Service model
jest.mock("../../models/user", ()=>({
        findByPk: jest.fn()
    })); // Mock findByPk method for User model
jest.mock("../../models/order", ()=>({
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn()
    })); // Mock the methods for Order model
// Mock the sequelize instance to avoid interacting with a real database
jest.mock("../../config/database", ()=>({
        sequelize: {
            sync: jest.fn().mockResolvedValue(null),
            close: jest.fn().mockResolvedValue(null),
            authenticate: jest.fn().mockResolvedValue(null),
            addModels: jest.fn()
        }
    }));
beforeAll(async ()=>{
    try {
        await _database.sequelize.authenticate(); // Mock database connection
        console.log("Mock database connected successfully!");
        // Mock adding models to sequelize
        _database.sequelize.addModels([
            _order.Order,
            _user.default,
            _services.Service
        ]); // Add necessary models here
        await _database.sequelize.sync({
            force: true
        }); // Ensure a clean state before tests
    } catch (error) {
        console.error("Error during database setup:", error);
        throw error; // Fail tests if database setup fails
    }
});
afterEach(()=>{
    jest.clearAllMocks(); // Clear mocks to ensure a clean state
});
afterAll(async ()=>{
    await _database.sequelize.close(); // Close the mock database connection
});
describe("Order Controller Tests", ()=>{
    it("should create a new order", async ()=>{
        const mockUser = {
            id: 1,
            username: "testuser",
            email: "user@example.com"
        };
        const mockService = {
            id: 1,
            name: "Test Service"
        };
        // Mock User and Service responses
        _user.default.findByPk.mockResolvedValueOnce(mockUser);
        _services.Service.findByPk.mockResolvedValueOnce(mockService);
        // Mock Order.create method
        _order.Order.create.mockResolvedValueOnce({
            id: 1,
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: "Test order details",
            status: "Pending"
        });
        const response = await (0, _supertest.default)(_index.default).post("/api/orders").send({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: "Test order details"
        });
        expect(response.status).toBe(201);
        expect(response.body.message).toBe("Order created successfully");
        expect(response.body.order.status).toBe("Pending");
        expect(_order.Order.create).toHaveBeenCalledWith({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: "Test order details"
        });
    });
    it("should return an error if user is not found", async ()=>{
        const mockService = {
            id: 1,
            name: "Test Service"
        };
        _user.default.findByPk.mockResolvedValueOnce(null); // Mock no user found
        _services.Service.findByPk.mockResolvedValueOnce(mockService);
        const response = await (0, _supertest.default)(_index.default).post("/api/orders").send({
            userId: 999,
            serviceId: mockService.id,
            orderDetails: "Test order details"
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
    });
    it("should return an error if service is not found", async ()=>{
        const mockUser = {
            id: 1,
            username: "testuser",
            email: "user@example.com"
        };
        _user.default.findByPk.mockResolvedValueOnce(mockUser);
        _services.Service.findByPk.mockResolvedValueOnce(null); // Mock no service found
        const response = await (0, _supertest.default)(_index.default).post("/api/orders").send({
            userId: mockUser.id,
            serviceId: 999,
            orderDetails: "Test order details"
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Service not found");
    });
    it("should return an error if order details are missing", async ()=>{
        const mockUser = {
            id: 1,
            username: "testuser",
            email: "user@example.com"
        };
        const mockService = {
            id: 1,
            name: "Test Service"
        };
        _user.default.findByPk.mockResolvedValueOnce(mockUser);
        _services.Service.findByPk.mockResolvedValueOnce(mockService);
        const response = await (0, _supertest.default)(_index.default).post("/api/orders").send({
            userId: mockUser.id,
            serviceId: mockService.id
        });
        expect(response.status).toBe(400); // Missing order details should return 400 Bad Request
        expect(response.body.message).toBe("Order details are required");
    });
});
