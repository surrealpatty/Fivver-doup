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
var service_1 = require("../models/service"); // Adjust path if necessary
var database_1 = require("../config/database"); // Ensure correct import of sequelize instance
var user_1 = require("../models/user"); // Ensure you have access to the User model for creating a user
describe('Service Model Tests', function () {
    var testUser;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Set up your test database (if needed)
                return [4 /*yield*/, database_1.sequelize.sync({ force: true })];
                case 1:
                    // Set up your test database (if needed)
                    _a.sent();
                    return [4 /*yield*/, user_1.User.create({
                            email: 'testuser@example.com',
                            username: 'testuser',
                            password: 'password123', // Add a password or adjust accordingly
                        })];
                case 2:
                    // Create a test user to associate with services
                    testUser = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should create a new service', function () { return __awaiter(void 0, void 0, void 0, function () {
        var service;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service_1.Service.create({
                        title: 'Test Service',
                        description: 'This is a test service.',
                        price: 100,
                        userId: testUser.id, // Ensure the service is associated with the test user
                    })];
                case 1:
                    service = _a.sent();
                    expect(service).toHaveProperty('id');
                    expect(service.title).toBe('Test Service');
                    expect(service.userId).toBe(testUser.id); // Ensure the userId is correctly set
                    return [2 /*return*/];
            }
        });
    }); });
    it('should find all services', function () { return __awaiter(void 0, void 0, void 0, function () {
        var services;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service_1.Service.findAll()];
                case 1:
                    services = _a.sent();
                    expect(services).toBeInstanceOf(Array);
                    expect(services.length).toBeGreaterThan(0); // Optionally check length
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a service', function () { return __awaiter(void 0, void 0, void 0, function () {
        var service;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service_1.Service.create({
                        title: 'Old Service',
                        description: 'This is an old service.',
                        price: 50,
                        userId: testUser.id, // Ensure the service is associated with the test user
                    })];
                case 1:
                    service = _a.sent();
                    service.title = 'Updated Service';
                    return [4 /*yield*/, service.save()];
                case 2:
                    _a.sent();
                    expect(service.title).toBe('Updated Service');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete a service', function () { return __awaiter(void 0, void 0, void 0, function () {
        var service, deletedService;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service_1.Service.create({
                        title: 'Service to Delete',
                        description: 'This service will be deleted.',
                        price: 30,
                        userId: testUser.id, // Ensure the service is associated with the test user
                    })];
                case 1:
                    service = _a.sent();
                    return [4 /*yield*/, service.destroy()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, service_1.Service.findByPk(service.id)];
                case 3:
                    deletedService = _a.sent();
                    expect(deletedService).toBeNull();
                    return [2 /*return*/];
            }
        });
    }); });
});
