// Adjusting the import path to refer to dist/src (transpiled code)
import { createOrder } from 'dist/src/controllers/orderController';  // Correct path for the controller
import Order from 'dist/src/models/order';  // Correct path for Order model
import User from 'dist/src/models/user';  // Correct path for User model
import Service from 'dist/src/models/service';  // Correct path for Service model

// Mocking data
const mockUsers = [
  { id: 1, username: 'testuser' } // Mocked user with an ID and username
];

const mockServices = [
  { id: 1, name: 'testservice' } // Mocked service with an ID and name
];

// Mock the Order model methods
jest.mock('dist/models/order', () => ({
  create: jest.fn().mockResolvedValue({
    id: 1, // Mock ID for the created order
    userId: mockUsers[0].id, // Mocked user ID
    serviceId: mockServices[0].id, // Mocked service ID
    orderDetails: 'Test order details', // Mocked order details
    status: 'Pending', // Default order status
  }),
}));

// Mock the User model
jest.mock('dist/src/models/user', () => ({
  findByPk: jest.fn().mockResolvedValue(mockUsers[0]), // Mocked user fetch
}));

// Mock the Service model
jest.mock('dist/src/models/service', () => ({
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
      status: jest.fn().mockReturnThis(),  // Mock response's status function
      json: jest.fn().mockReturnThis(),  // Mock response's json function
    };

    // Call the createOrder controller method
    await createOrder(req, res);

    // Assert that the response status is 201 (Created)
    expect(res.status).toHaveBeenCalledWith(201);
    
    // Assert that the response JSON matches the expected structure
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

  // Additional tests can be added for other actions like getOrders, getOrderById, etc.
});
