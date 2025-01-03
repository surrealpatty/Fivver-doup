"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _database = require("../config/database");
const _user = require("../models/user");
// Run migrations or sync models before tests to ensure the database is set up correctly
beforeAll(async ()=>{
    // Sync the models with the database before running tests
    await _database.sequelize.sync({
        force: true
    }); // `force: true` will drop and re-create the tables for a clean slate
});
describe('User Creation Tests', ()=>{
    it('should create a user successfully', async ()=>{
        // Create a new user
        const user = await _user.User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword',
            role: 'user',
            tier: '1',
            isVerified: false // Add isVerified (default or specific value)
        });
        // Check that the user is created correctly
        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('testpassword');
        expect(user.role).toBe('user');
        expect(user.tier).toBe('1'); // Expect '1' as a string
        expect(user.isVerified).toBe(false);
    });
});
// Add tests for other models or functionality here as needed
afterAll(async ()=>{
    // Close the database connection after tests
    await _database.sequelize.close();
});
