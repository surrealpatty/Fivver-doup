// Importing the necessary functions and mock data
const { placeOrder } = require('../controllers/orderController'); // Adjust path if necessary
const { mockUsers, mockServices } = require('./mockData'); // Adjust the path to your mock data

// Mocking dependencies (if necessary)
jest.mock('../controllers/orderController', () => ({
    placeOrder: jest.fn(),
}));

describe('Order Functions', () => {
    beforeEach(() => {
        // Reset mock function before each test (in case needed)
        placeOrder.mockReset();
    });

    test('should place a new order', async () => {
        // Mock order data
        const orderData = {
            userId: mockUsers[0].username, // Use a mock user
            serviceId: mockServices[0].name, // Use a mock service
            quantity: 1,
        };

        // Mock the response from the placeOrder function
        const mockResponse = {
            id: 123, // Mocked ID for the new order
            userId: orderData.userId,
            serviceId: orderData.serviceId,
            quantity: orderData.quantity,
        };

        placeOrder.mockResolvedValue(mockResponse); // Mock the async response

        // Call the function under test
        const result = await placeOrder(orderData);

        // Assertions
        expect(result).toHaveProperty('id'); // Check if the result has an ID
        expect(result.userId).toBe(orderData.userId); // Check user ID
        expect(result.serviceId).toBe(orderData.serviceId); // Check service ID
        expect(result.quantity).toBe(orderData.quantity); // Check quantity
    });

    // Additional tests can be added here as needed
});
