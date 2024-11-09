import { createOrder } from '../controllers/orderController';  // Adjust the path to point to controllers correctly
import Order from '../models/order'; // Import the Order model (if needed for mocking)
import User from '../models/user';  // Import the User model (if needed for mocking)
import Service from '../models/service'; // Import the Service model (if needed for mocking)

// Mocking data
const mockUsers = [
  { id: 1, username: 'testuser' } // Mocked user with an ID and username
];

const mockServices = [
  { id: 1, name: 'testservice' } // Mocked service with an ID and name
];

// Mock the Order model methods if needed
jest.mock('../models/order', () => ({
  create: jest.fn().mockResolvedValue({
    id: 1, // Mock ID for the created order
    userId: mockUsers[0].id, // Ensure mockUsers has valid data
    serviceId: mockServices[0].id, // Ensure mockServices has valid data
    orderDetails: 'Test order details', // Add mock details
    status: 'Pending', // Default status
  }),
}));

// Mock the User and Service models if needed
jest.mock('../models/user', () => ({
  findByPk: jest.fn().mockResolvedValue(mockUsers[0]), // Mocked user fetch
}));

jest.mock('../models/service', () => ({
  findByPk: jest.fn().mockResolvedValue(mockServices[0]), // Mocked service fetch
}));

describe('Order Controller Tests', () => {
  test('should create an order', async () => {
    const req = {
      body: {
        userId: mockUsers[0].id,
        serviceId: mockServices[0].id,
        orderDetails: 'Test order details',
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    await createOrder(req, res);

    expect(res.status).toHaveBeenCalledWith(201);  // Ensure status 201 for created order
    expect(res.json).toHaveBeenCalledWith({
      message: 'Order created successfully',
      order: expect.objectContaining({
        id: expect.any(Number),  // Expect any number for the order ID
        userId: mockUsers[0].id,
        serviceId: mockServices[0].id,
        orderDetails: 'Test order details',
        status: 'Pending',
      }),
    });
  });

  // You can add more tests for other order-related actions (getOrders, getOrderById, etc.)
});
