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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = require("supertest");
var bcryptjs_1 = require("bcryptjs");
var jsonwebtoken_1 = require("jsonwebtoken");
var index_1 = require("../index"); // Adjust path to match the main app export
var user_1 = require("../models/user"); // Adjust path to your User model
// Set up a mock JWT secret for testing
process.env.JWT_SECRET = 'testsecret';
// Mock jwt and User model methods
jest.mock('jsonwebtoken', function () { return ({
    sign: jest.fn(),
    verify: jest.fn(),
}); });
jest.mock('../models/user', function () { return ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}); });
describe('User Controller', function () {
    afterEach(function () {
        jest.clearAllMocks(); // Reset all mocks after each test
    });
    test('should register a new user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // Mock findOne to simulate that the user does not already exist
                    user_1.User.findOne.mockResolvedValue(null);
                    // Mock create to simulate successful user creation
                    user_1.User.create.mockResolvedValue({
                        id: 1,
                        username: 'testuser',
                        email: 'test@example.com',
                        password: 'hashedpassword',
                    });
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .post('/api/users/register')
                            .send({
                            username: 'testuser',
                            email: 'test@example.com',
                            password: 'testpassword',
                        })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(201);
                    expect(response.body).toHaveProperty('username', 'testuser');
                    expect(response.body).toHaveProperty('email', 'test@example.com');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should login a user and return a token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var hashedPassword, mockToken, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bcryptjs_1.default.hash('testpassword', 10)];
                case 1:
                    hashedPassword = _a.sent();
                    // Mock findOne to simulate a user with the hashed password
                    user_1.User.findOne.mockResolvedValue({
                        id: 1,
                        email: 'test@example.com',
                        password: hashedPassword,
                    });
                    mockToken = 'mock.jwt.token';
                    // Mock jwt.sign to return a test token
                    jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .post('/api/users/login')
                            .send({
                            email: 'test@example.com',
                            password: 'testpassword',
                        })];
                case 2:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toHaveProperty('token', mockToken);
                    return [2 /*return*/];
            }
        });
    }); });
    test('should return user profile', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockToken, mockUser, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockToken = 'mock.jwt.token';
                    // Mock jwt.verify to decode the token and return a mock user id
                    jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
                    mockUser = {
                        id: 1,
                        username: 'testuser',
                        email: 'test@example.com',
                    };
                    // Mock findByPk to return a user profile
                    user_1.User.findByPk.mockResolvedValue(mockUser);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .get('/api/users/profile')
                            .set('Authorization', "Bearer ".concat(mockToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toHaveProperty('username', 'testuser');
                    expect(response.body).toHaveProperty('email', 'test@example.com');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should update user profile', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockToken, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockToken = 'mock.jwt.token';
                    // Mock jwt.verify to decode the token and return a mock user id
                    jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
                    // Mock update to simulate a successful update
                    user_1.User.update.mockResolvedValue([1]); // Sequelize returns [1] on successful update
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .put('/api/users/profile')
                            .set('Authorization', "Bearer ".concat(mockToken))
                            .send({ username: 'updatedUser' })];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toHaveProperty('message', 'Profile updated successfully');
                    return [2 /*return*/];
            }
        });
    }); });
    test('should delete user account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockToken, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockToken = 'mock.jwt.token';
                    // Mock jwt.verify to decode the token and return a mock user id
                    jsonwebtoken_1.default.verify.mockReturnValue({ userId: 1 });
                    // Mock destroy to simulate user deletion
                    user_1.User.destroy.mockResolvedValue(1); // Sequelize returns 1 on successful deletion
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .delete('/api/users/profile')
                            .set('Authorization', "Bearer ".concat(mockToken))];
                case 1:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body).toHaveProperty('message', 'User deleted successfully');
                    return [2 /*return*/];
            }
        });
    }); });
});
