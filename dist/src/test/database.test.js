"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
describe('Database Connection', ()=>{
    // Real database connection test
    it('should connect to the database successfully', async ()=>{
        try {
            await _database.sequelize.authenticate(); // Attempt to authenticate the connection
            console.log('Database connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error; // Fail the test if the connection cannot be established
        }
    });
    // Mocked database connection test
    it('should mock database connection successfully', async ()=>{
        // Mock the sequelize.authenticate method to simulate a successful connection
        const mockAuthenticate = jest.spyOn(_database.sequelize, 'authenticate').mockResolvedValue(undefined);
        // Call authenticate to test the mocked method
        const result = await _database.sequelize.authenticate();
        // Assert that the mocked authenticate method was called and no error was thrown
        expect(mockAuthenticate).toHaveBeenCalled();
        expect(result).toBeUndefined(); // This checks that no error was thrown
        // Restore the original authenticate method after the test
        mockAuthenticate.mockRestore();
    });
});

//# sourceMappingURL=database.test.js.map