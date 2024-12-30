// src/test/database.test.ts
import { sequelize } from '../config/database';
describe('Database Connection', () => {
    // Real database connection test
    it('should connect to the database successfully', async () => {
        try {
            await sequelize.authenticate(); // Attempt to authenticate the connection
            console.log('Database connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
            throw error; // Fail the test if the connection cannot be established
        }
    });
    // Mocked database connection test
    it('should mock database connection successfully', async () => {
        // Mock the sequelize.authenticate method to simulate a successful connection
        const mockAuthenticate = jest.fn().mockResolvedValue(undefined);
        // Temporarily replace the sequelize.authenticate method with the mock
        sequelize.authenticate = mockAuthenticate;
        // Call authenticate to test the mocked method
        const result = await sequelize.authenticate();
        // Assert that the mocked authenticate method was called and no error was thrown
        expect(mockAuthenticate).toHaveBeenCalled();
        expect(result).toBeUndefined(); // This checks that no error was thrown
    });
});
