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
const index_1 = require("../index");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (userId, role) => {
    return jsonwebtoken_1.default.sign({ id: userId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
describe('Role-based Access', () => {
    const paidToken = generateToken('1', 'Paid');
    const freeToken = generateToken('2', 'Free');
    it('should allow paid users to access premium services', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app)
            .get('/services/premium')
            .set('Authorization', `Bearer ${paidToken}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    }));
    it('should deny free users from accessing premium services', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app)
            .get('/services/premium')
            .set('Authorization', `Bearer ${freeToken}`);
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    }));
});
describe('Basic Test Suite', () => {
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true);
    });
    it('should respond with a message from the root endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(index_1.app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Fiverr backend is running');
    }));
});
