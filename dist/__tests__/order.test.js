"use strict";
const { placeOrder } = require('../controllers/orderController');
const { mockUsers, mockServices } = require('./mockData'); // Adjust the path to your mock data as necessary
const { Order } = require('../models/order'); // Ensure you're importing the correct model

// Mocking the Order model
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

describe('Order Tests', () => {
  let mockUsers;
  let mockServices;

  // Initialize mock data before each test
  beforeEach(() => {
    mockUsers = [
      { username: 'testUser' }, // Ensure this data is populated
    ];
    mockServices = [
      { name: 'service1' }, // Add mock services if needed
    ];

    // Check if mock data is correctly initialized
    if (mockUsers.length === 0) {
      throw new Error('mockUsers is empty');
    }
    if (mockServices.length === 0) {
      throw new Error('mockServices is empty');
    }
  });

  test('should create an order', async () => {
    // Simulate placing an order with the mock data
    const order = await placeOrder({
      userId: mockUsers[0].username,
      serviceId: mockServices[0].name,
      quantity: 1,
    });

    // Assertions
    expect(order.userId).toBe(mockUsers[0].username);
    expect(order.serviceId).toBe(mockServices[0].name);
    expect(order.quantity).toBe(1);

    // Verify the Order.create method was called
    expect(Order.create).toHaveBeenCalledWith({
      userId: mockUsers[0].username,
      serviceId: mockServices[0].name,
      quantity: 1,
    });
  });

  // Add other tests here...
});
