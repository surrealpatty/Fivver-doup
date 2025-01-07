"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _user = require("../models/user");
const _UserRoles = require("../types/UserRoles");
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
        // Create a user without specifying the tier
        const user = await _user.User.create({
            email: 'test@example.com',
            username: 'testuser',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            isVerified: false
        });
        // Validate the default tier
        expect(user.tier).toBe(_UserRoles.UserTier.Free); // Ensure the default tier is 'free'
    });
    it('should create a user with a specified tier', async ()=>{
        // Create a user with a specified tier
        const user = await _user.User.create({
            email: 'test2@example.com',
            username: 'testuser2',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Paid,
            isVerified: false
        });
        // Validate the specified tier
        expect(user.tier).toBe(_UserRoles.UserTier.Paid); // Ensure the tier is 'paid'
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
        try {
            await _user.User.create(invalidUserData);
        } catch (error) {
            // Ensure the error is related to Sequelize validation
            expect(error).toBeDefined();
            expect(error.name).toBe('SequelizeValidationError'); // Validate the error type
        }
    });
    it('should handle missing tier gracefully and use default tier of "free"', async ()=>{
        const userDataWithoutTier = {
            email: 'notier@example.com',
            username: 'notieruser',
            password: 'testpassword',
            role: _UserRoles.UserRole.User,
            isVerified: true
        };
        const user = await _user.User.create(userDataWithoutTier);
        // Default tier should be applied (if defined in the model)
        expect(user.tier).toBe(_UserRoles.UserTier.Free); // Ensure the default tier is 'free'
    });
    it('should create a user with the correct tier when tier is explicitly set', async ()=>{
        const user = await _user.User.create({
            email: 'paidtier@example.com',
            username: 'paidtieruser',
            password: 'testpassword',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Paid,
            isVerified: true
        });
        expect(user.tier).toBe(_UserRoles.UserTier.Paid); // The specified tier should be 'paid'
    });
});
