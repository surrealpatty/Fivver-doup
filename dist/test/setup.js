"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mock global setup
jest.mock('../models/user', () => {
    return {
        // Mocking the necessary methods on the User model
        findOne: jest.fn(),
        create: jest.fn(),
    };
}); // Mock the User model for the tests
// Mocking JWT verify method
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
    sign: jest.fn(), // You may also need to mock `sign` method depending on your tests
}));
// Mock other necessary modules
// Example: Mock database connection
jest.mock('../config/database', () => ({
    sequelize: {
        authenticate: jest.fn().mockResolvedValue(undefined),
    },
}));
// Example: Mocking a function that you may need in your tests
// jest.mock('../utils/someUtility', () => ({
//   someFunction: jest.fn().mockReturnValue('some value'),
// }));
// Optionally, you can add global setup for environment variables or mock implementations
beforeAll(() => {
    // Example: Set up mock environment variables if needed
    process.env.JWT_SECRET = 'mock-secret-key';
});
// Optionally, reset all mocks between tests to avoid state leakage
afterEach(() => {
    jest.resetAllMocks();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGVzdC9zZXR1cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLG9CQUFvQjtBQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtJQUMvQixPQUFPO1FBQ0wsa0RBQWtEO1FBQ2xELE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO1FBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO0tBQ2xCLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyxDQUFFLG9DQUFvQztBQUV6Qyw0QkFBNEI7QUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMvQixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtJQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLGtFQUFrRTtDQUNwRixDQUFDLENBQUMsQ0FBQztBQUVKLCtCQUErQjtBQUMvQixvQ0FBb0M7QUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JDLFNBQVMsRUFBRTtRQUNULFlBQVksRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDO0tBQ3JEO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSiw4REFBOEQ7QUFDOUQsNkNBQTZDO0FBQzdDLDJEQUEyRDtBQUMzRCxPQUFPO0FBRVAseUZBQXlGO0FBQ3pGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7SUFDYix1REFBdUQ7SUFDdkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUM7QUFDN0MsQ0FBQyxDQUFDLENBQUM7QUFFSCxtRUFBbUU7QUFDbkUsU0FBUyxDQUFDLEdBQUcsRUFBRTtJQUNiLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUN2QixDQUFDLENBQUMsQ0FBQyJ9