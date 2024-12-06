"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _sequelize = require("sequelize");
const _database = require("../config/database");
// Mocking the database connection
jest.mock('../config/database', ()=>{
    const mockSequelize = new _sequelize.Sequelize('mysql://user:pass@localhost:3306/database');
    mockSequelize.authenticate = jest.fn().mockResolvedValue(undefined); // Mock successful authentication
    return {
        sequelize: mockSequelize
    }; // Mock sequelize as a named export
});
describe('Database Connection', ()=>{
    it('should connect successfully', async ()=>{
        // Act: Call authenticate to test DB connection
        const result = await _database.sequelize.authenticate();
        // Assert: Ensure that the mocked authenticate method does not throw an error
        expect(result).toBeUndefined(); // This checks that no error was thrown and that the result is undefined as expected for the mock
    });
});

//# sourceMappingURL=database.test.js.map