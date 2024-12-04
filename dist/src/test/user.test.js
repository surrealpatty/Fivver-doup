"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _user = require("../models/user");
describe('User Model Tests', ()=>{
    // Before all tests, ensure the database connection is established
    beforeAll(async ()=>{
        // Optional: Add logic to ensure the DB is synced or any required setup
        console.log('Setting up database connection...');
        await _database.sequelize.authenticate(); // Ensure the Sequelize connection is authenticated
    });
    it('should create a new user', async ()=>{
        // Create a user instance
        const user = await _user.User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword123'
        });
        // Ensure the user is defined and the necessary fields are present
        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('test@example.com');
    });
    // Additional test cases can go here...
    // After all tests, close the Sequelize connection
    afterAll(async ()=>{
        console.log('Closing database connection...');
        await _database.sequelize.close(); // Close the database connection after all tests
    });
});

//# sourceMappingURL=user.test.js.map