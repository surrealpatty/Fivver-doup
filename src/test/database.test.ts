import { sequelize } from '../config/database';
import { testConnection } from '../config/database';

// Mock the authenticate method
const mockAuthenticate = jest.spyOn(sequelize, 'authenticate').mockResolvedValue();

// Mock console log and error
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('Database Connection', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should successfully connect to the database', async () => {
        const connection = await testConnection();

        expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Ensure the mock is being called
        expect(consoleLogSpy).toHaveBeenCalledWith('Database connection successful');
        expect(connection).toBeTruthy();
    });

    test('should log an error when the database connection fails', async () => {
        const errorMessage = 'Test Connection Error';
        mockAuthenticate.mockRejectedValueOnce(new Error(errorMessage)); // Simulate connection failure

        const connection = await testConnection();

        expect(mockAuthenticate).toHaveBeenCalledTimes(1); // Ensure the mock is called even in failure
        expect(consoleErrorSpy).toHaveBeenCalledWith(
            'Unable to connect to the database:',
            errorMessage
        );
        expect(connection).toBeFalsy();
    });
});
