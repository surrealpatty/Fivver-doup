// src/__tests__/order.test.js

"use strict";
const { placeOrder } = require('../../src/controllers/orderController');
const { mockUsers, mockServices } = require('../../src/__tests__/mockData'); // Adjust path for dist
const { Order } = require('../../src/models/order'); // Ensure correct import relative to dist

// Mocking the Order model
jest.mock('../../src/models/order', () => ({
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
  // Initialize mock data before each test
  let mockUsers;
  let mockServices;

  beforeEach(() => {
    mockUsers = [
      { username: 'testUser' }, // Mock user data
    ];
    mockServices = [
      { name: 'service1' }, // Mock service data
    ];

    // Validate mock data is correctly initialized
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

    // Verify that the Order.create method was called correctly
    expect(Order.create).toHaveBeenCalledWith({
      userId: mockUsers[0].username,
      serviceId: mockServices[0].name,
      quantity: 1,
    });
  });

  // You can add more tests here...
});
