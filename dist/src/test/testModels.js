"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("../models/user");
const _database = require("../config/database");
const _UserRoles = require("../types/UserRoles");
describe('User Model', ()=>{
    beforeAll(async ()=>{
        // Sync the database before running tests
        await _database.sequelize.sync({
            force: true
        });
    });
    afterAll(async ()=>{
        // Close the Sequelize connection after all tests
        await _database.sequelize.close();
    });
    it('should create a user with valid tier', async ()=>{
        const userData = {
            email: 'test@example.com',
            username: 'testuser',
            password: 'testpassword',
            role: _UserRoles.UserRole.User,
            tier: _UserRoles.UserTier.Paid,
            isVerified: true
        };
        const user = await _user.User.create(userData);
        // Assertions to validate that the user has been created successfully
        expect(user.id).toBeDefined(); // Ensure the ID is generated
        expect(user.tier).toBe(_UserRoles.UserTier.Paid); // Ensure the tier is set correctly
        expect(user.role).toBe(_UserRoles.UserRole.User); // Ensure the role is set correctly
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
    it('should handle missing tier gracefully', async ()=>{
        const userDataWithoutTier = {
            email: 'notier@example.com',
            username: 'notieruser',
            password: 'testpassword',
            role: _UserRoles.UserRole.User,
            isVerified: true,
            // Explicitly set tier to undefined
            tier: undefined
        };
        const user = await _user.User.create(userDataWithoutTier);
        // Default tier should be applied (if defined in the model)
        expect(user.id).toBeDefined();
        expect(user.tier).toBe(_UserRoles.UserTier.Free); // Ensure the default tier is correctly set
    });
});
