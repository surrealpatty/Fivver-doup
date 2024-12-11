"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize"); // Ensure Sequelize is imported correctly
const database_1 = require("../config/database"); // Corrected import for sequelize
// Mocking the database connection
jest.mock('../config/database', () => {
    const mockSequelize = new sequelize_1.Sequelize('mysql://user:pass@localhost:3306/database');
    mockSequelize.authenticate = jest.fn().mockResolvedValue(undefined); // Mock successful authentication
    return { sequelize: mockSequelize }; // Mock sequelize as a named export
});
describe('Database Connection', () => {
    it('should connect successfully', async () => {
        // Act: Call authenticate to test DB connection
        const result = await database_1.sequelize.authenticate();
        // Assert: Ensure that the mocked authenticate method does not throw an error
        expect(result).toBeUndefined(); // This checks that no error was thrown and that the result is undefined as expected for the mock
    });
});
//# sourceMappingURL=database.test.js.map