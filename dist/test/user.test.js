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
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const database_1 = require("../config/database");
// Before all tests, synchronize the database
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.sync({ force: true }); // Drops and recreates tables
}));
// After each test, clear the database
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.User.destroy({ where: {} });
}));
// After all tests, close the connection
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.sequelize.close();
}));
describe('User Model', () => {
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_1.User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            role: 'user',
            subscriptionStatus: 'free',
        });
        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('test@example.com');
        expect(user.role).toBe('user');
        expect(user.subscriptionStatus).toBe('free');
    }));
});
//# sourceMappingURL=user.test.js.map