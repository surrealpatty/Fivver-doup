"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _path = /*#__PURE__*/ _interop_require_default(require("path"));
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _database = require("../config/database");
const _user = require("../models/user");
const _services = /*#__PURE__*/ _interop_require_default(require("../models/services"));
const _order = require("../models/order");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
// Mock the methods of the models
jest.mock('../models/services', ()=>({
        findByPk: jest.fn()
    }));
jest.mock('../models/user', ()=>({
        findByPk: jest.fn()
    }));
// Mock the Order model methods
jest.mock('../models/order', ()=>({
        create: jest.fn(),
        findAll: jest.fn(),
        findByPk: jest.fn(),
        destroy: jest.fn()
    }));
// Define the path to the compiled `index.js` file in `dist/`
const appPath = _path.default.resolve(__dirname, '../dist/index');
// Initialize `app` variable with explicit typing as `Express.Application`
let app;
beforeAll(async ()=>{
    try {
        // Dynamically import the app from the compiled dist/index.js
        const module = await Promise.resolve(appPath).then((p)=>/*#__PURE__*/ _interop_require_wildcard(require(p)));
        app = module.default || module.app; // Adjust depending on how your app is exported
    } catch (error) {
        console.error('Error loading app from dist:', error);
        throw error; // Ensure the test fails if the app can't be loaded
    }
    // Sync database (force drop & recreate tables before tests)
    await _database.sequelize.sync({
        force: true
    });
});
afterEach(()=>{
    jest.clearAllMocks(); // Clear mocks to ensure clean state between tests
});
afterAll(async ()=>{
    await _database.sequelize.close(); // Close the database connection after all tests
});
describe('Order Controller Tests', ()=>{
    it('should create a new order', async ()=>{
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'user@example.com'
        };
        const mockService = {
            id: 1,
            name: 'Test Service'
        };
        // Mock the response for finding the user and service
        _user.User.findByPk.mockResolvedValueOnce(mockUser);
        _services.default.findByPk.mockResolvedValueOnce(mockService);
        // Mock the Order.create method to return a mock order
        _order.Order.create.mockResolvedValueOnce({
            id: 1,
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details',
            status: 'Pending'
        });
        // Make the API request to create the order
        const response = await (0, _supertest.default)(app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details'
        });
        // Assert the expected outcome
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Order created successfully');
        expect(response.body.order.status).toBe('Pending');
        expect(_order.Order.create).toHaveBeenCalledWith({
            userId: mockUser.id,
            serviceId: mockService.id,
            orderDetails: 'Test order details'
        });
    });
    it('should return an error if user is not found', async ()=>{
        const mockService = {
            id: 1,
            name: 'Test Service'
        };
        // Mock the response for finding the user and service
        _user.User.findByPk.mockResolvedValueOnce(null); // No user found
        _services.default.findByPk.mockResolvedValueOnce(mockService);
        // Make the API request to create the order
        const response = await (0, _supertest.default)(app).post('/api/orders').send({
            userId: 999,
            serviceId: mockService.id,
            orderDetails: 'Test order details'
        });
        // Assert the expected outcome
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('User not found');
    });
    it('should return an error if service is not found', async ()=>{
        const mockUser = {
            id: 1,
            username: 'testuser',
            email: 'user@example.com'
        };
        // Mock the response for finding the user and service
        _user.User.findByPk.mockResolvedValueOnce(mockUser);
        _services.default.findByPk.mockResolvedValueOnce(null); // No service found
        // Make the API request to create the order
        const response = await (0, _supertest.default)(app).post('/api/orders').send({
            userId: mockUser.id,
            serviceId: 999,
            orderDetails: 'Test order details'
        });
        // Assert the expected outcome
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Service not found');
    });
});

//# sourceMappingURL=order.test.js.map