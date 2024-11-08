"use strict";
const { placeOrder } = require('../controllers/orderController');
const { mockUsers, mockServices } = require('./mockData'); // Adjust the path to your mock data as necessary
const { Order } = require('../models/order'); // Ensure you're importing the correct model

jest.mock('../models/order', () => ({
  Order: {
    create: jest.fn().mockResolvedValue({
      id: 1, // Mock ID for the created order
      userId: mockUsers[0].username,
      serviceId: mockServices[0].name,
      quantity: 1,
    }),
  },
}));

describe('Order Functions', () => {
  test('should place a new order', async () => {
    // Mock order data
    const orderData = {
      userId: mockUsers[0].username, // Use a mock user
      serviceId: mockServices[0].name, // Use a mock service
      quantity: 1,
    };

    // Call the placeOrder function with the mock data
    const result = await placeOrder(orderData);

    // Check if the result has an expected property, e.g., an order ID
    expect(result).toHaveProperty('id'); // Check if the order has an ID
    expect(result.userId).toBe(orderData.userId); // Check user ID
    expect(result.serviceId).toBe(orderData.serviceId); // Check service ID
    expect(result.quantity).toBe(orderData.quantity); // Check quantity
  });
});
