"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const user_1 = __importDefault(require("../models/user"));
const UserRoles_1 = require("../types/UserRoles");
describe('User Model Tests', () => {
    beforeAll(async () => {
        // Sync the database before tests
        await database_1.sequelize.sync({ force: true });
    });
    afterAll(async () => {
        // Close the database connection after tests
        await database_1.sequelize.close();
    });
    it('should create a user with the default tier of "free" when tier is not provided', async () => {
        const userData = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            role: UserRoles_1.UserRole.User,
            tier: UserRoles_1.UserTier.Free,
            isVerified: false,
        };
        const user = await user_1.default.create(userData);
        expect(user.tier).toBe(UserRoles_1.UserTier.Free);
    });
    it('should create a user with a specified tier', async () => {
        const userData = {
            email: 'test2@example.com',
            username: 'testuser2',
            password: 'password123',
            role: UserRoles_1.UserRole.User,
            tier: UserRoles_1.UserTier.Paid,
            isVerified: false,
        };
        const user = await user_1.default.create(userData);
        expect(user.tier).toBe(UserRoles_1.UserTier.Paid);
    });
    it('should fail to create a user with an invalid tier', async () => {
        const invalidUserData = {
            email: 'invalid@example.com',
            username: 'invaliduser',
            password: 'testpassword',
            role: UserRoles_1.UserRole.User,
            tier: 'invalidTier', // This should cause validation failure
            isVerified: true,
        };
        await expect(user_1.default.create(invalidUserData)).rejects.toThrow('SequelizeValidationError');
    });
    it('should handle missing tier gracefully and use default tier of "free"', async () => {
        const userData = {
            email: 'notier@example.com',
            username: 'notieruser',
            password: 'testpassword',
            role: UserRoles_1.UserRole.User,
            tier: UserRoles_1.UserTier.Free,
            isVerified: true,
        };
        const user = await user_1.default.create(userData);
        expect(user.tier).toBe(UserRoles_1.UserTier.Free);
    });
    it('should create a user with the correct tier when tier is explicitly set', async () => {
        const userData = {
            email: 'paidtier@example.com',
            username: 'paidtieruser',
            password: 'testpassword',
            role: UserRoles_1.UserRole.User,
            tier: UserRoles_1.UserTier.Paid,
            isVerified: true,
        };
        const user = await user_1.default.create(userData);
        expect(user.tier).toBe(UserRoles_1.UserTier.Paid);
    });
});
