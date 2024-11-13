"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database"); // Adjust the path to your database configuration
// Mock Sequelize's authenticate method to avoid real database calls during tests
jest.mock('sequelize', () => {
    const originalSequelize = jest.requireActual('sequelize');
    return {
        ...originalSequelize,
        Sequelize: jest.fn().mockImplementation(() => ({
            authenticate: jest.fn(),
        })),
    };
});
describe('Database Connection', () => {
    // Mock the actual authenticate method
    const mockAuthenticate = jest.fn();
    beforeAll(() => {
        // Set up mock implementation for testing
        database_1.sequelize.authenticate = mockAuthenticate;
    });
    afterAll(() => {
        jest.clearAllMocks(); // Clear mocks after tests run
    });
    test('should successfully connect to the database', async () => {
        mockAuthenticate.mockResolvedValueOnce(undefined); // Simulate a successful connection
        // Mock console.log
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        // Call the testConnection function
        await (0, database_1.testConnection)();
        // Ensure authenticate was called
        expect(mockAuthenticate).toHaveBeenCalledTimes(1);
        expect(mockAuthenticate).toHaveBeenCalledWith();
        // Check if success message was logged
        expect(consoleLogSpy).toHaveBeenCalledWith('Database connection has been established successfully.');
        // Clean up spy
        consoleLogSpy.mockRestore();
    });
    test('should fail to connect to the database', async () => {
        mockAuthenticate.mockRejectedValueOnce(new Error('Connection failed')); // Simulate a failed connection
        // Mock error logging
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        // Call the testConnection function
        await (0, database_1.testConnection)();
        // Ensure authenticate was called
        expect(mockAuthenticate).toHaveBeenCalledTimes(1);
        expect(mockAuthenticate).toHaveBeenCalledWith();
        // Check if error message was logged
        expect(consoleErrorSpy).toHaveBeenCalledWith('Unable to connect to the database:', 'Connection failed');
        // Clean up spy
        consoleErrorSpy.mockRestore();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90ZXN0L2RhdGFiYXNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBK0QsQ0FBQyxpREFBaUQ7QUFHakgsaUZBQWlGO0FBQ2pGLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRTtJQUMxQixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDMUQsT0FBTztRQUNMLEdBQUcsaUJBQWlCO1FBQ3BCLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUM3QyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtTQUN4QixDQUFDLENBQUM7S0FDSixDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLHNDQUFzQztJQUN0QyxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUVuQyxTQUFTLENBQUMsR0FBRyxFQUFFO1FBQ2IseUNBQXlDO1FBQ3hDLG9CQUFTLENBQUMsWUFBMEIsR0FBRyxnQkFBZ0IsQ0FBQztJQUMzRCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxHQUFHLEVBQUU7UUFDWixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyw4QkFBOEI7SUFDdEQsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsNkNBQTZDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDN0QsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxtQ0FBbUM7UUFFdEYsbUJBQW1CO1FBQ25CLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFdEUsbUNBQW1DO1FBQ25DLE1BQU0sSUFBQSx5QkFBYyxHQUFFLENBQUM7UUFFdkIsaUNBQWlDO1FBQ2pDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFFaEQsc0NBQXNDO1FBQ3RDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1FBRXJHLGVBQWU7UUFDZixhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsd0NBQXdDLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDeEQsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsK0JBQStCO1FBRXZHLHFCQUFxQjtRQUNyQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFFLG1DQUFtQztRQUNuQyxNQUFNLElBQUEseUJBQWMsR0FBRSxDQUFDO1FBRXZCLGlDQUFpQztRQUNqQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBRWhELG9DQUFvQztRQUNwQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsb0JBQW9CLENBQUMsb0NBQW9DLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUV4RyxlQUFlO1FBQ2YsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==