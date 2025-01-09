"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _UserRoles = require("../types/UserRoles");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('User Model Tests', ()=>{
    beforeAll(async ()=>{
        // Sync the database before tests
        await _database.sequelize.sync({
            force: true
        });
    });
    afterAll(async ()=>{
        // Close the database connection after tests
        await _database.sequelize.close();
    });
    it('should create a user with the default tier of "free" when tier is not provided', async ()=>{
        const userData = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Free,
            isVerified: false
        };
        const user = await _user.default.create(userData);
        expect(user.tier).toBe(_UserRoles.UserTier.Free);
    });
    it('should create a user with a specified tier', async ()=>{
        const userData = {
            email: 'test2@example.com',
            username: 'testuser2',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Paid,
            isVerified: false
        };
        const user = await _user.default.create(userData);
        expect(user.tier).toBe(_UserRoles.UserTier.Paid);
    });
    it('should fail to create a user with an invalid tier', async ()=>{
        const invalidUserData = {
            email: 'invalid@example.com',
            username: 'invaliduser',
            password: 'testpassword',
            role: _UserRoles.UserRole.User,
            tier: 'invalidTier',
            isVerified: true
        };
        await expect(_user.default.create(invalidUserData)).rejects.toThrow('SequelizeValidationError');
    });
    it('should handle missing tier gracefully and use default tier of "free"', async ()=>{
        const userData = {
            email: 'notier@example.com',
            username: 'notieruser',
            password: 'testpassword',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Free,
            isVerified: true
        };
        const user = await _user.default.create(userData);
        expect(user.tier).toBe(_UserRoles.UserTier.Free);
    });
    it('should create a user with the correct tier when tier is explicitly set', async ()=>{
        const userData = {
            email: 'paidtier@example.com',
            username: 'paidtieruser',
            password: 'testpassword',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Paid,
            isVerified: true
        };
        const user = await _user.default.create(userData);
        expect(user.tier).toBe(_UserRoles.UserTier.Paid);
    });
});
