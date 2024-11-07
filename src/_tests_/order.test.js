// Importing necessary functions and mock data
const { placeOrder } = require('../controllers/orderController'); // Adjust the path as necessary
const { mockUsers, mockServices } = require('./mockData'); // Adjust the path to your mock data

// Mocking the orderController methods
jest.mock('../controllers/orderController', () => ({
    placeOrder: jest.fn(),
}));

describe('Order Functions', () => {
    beforeEach(() => {
        // Reset mock function before each test to ensure a clean slate
        placeOrder.mockReset();
    });

    test('should place a new order', async () => {
        // Mock order data using mock users and services
        const orderData = {
            userId: mockUsers[0].id,  // Use a mock user ID (ensure the mock data is correct)
            serviceId: mockServices[0].id,  // Use a mock service ID (ensure the mock data is correct)
            quantity: 1,
        };

        // Mock the response from the placeOrder function
        const mockResponse = {
            id: 123,  // Mocked ID for the new order
            userId: orderData.userId,
            serviceId: orderData.serviceId,
            quantity: orderData.quantity,
        };

        placeOrder.mockResolvedValue(mockResponse); // Mock the async response

        // Call the function under test
        const result = await placeOrder(orderData);

        // Assertions to verify the result
        expect(result).toHaveProperty('id');  // Ensure the result has an ID property
        expect(result.userId).toBe(orderData.userId);  // Check if userId matches the input
        expect(result.serviceId).toBe(orderData.serviceId);  // Check if serviceId matches the input
        expect(result.quantity).toBe(orderData.quantity);  // Check if quantity matches the input
        expect(placeOrder).toHaveBeenCalledWith(orderData);  // Verify the function was called with the correct arguments
        expect(placeOrder).toHaveBeenCalledTimes(1);  // Verify the function was called once
    });

    // Additional tests can be added here as needed
});
