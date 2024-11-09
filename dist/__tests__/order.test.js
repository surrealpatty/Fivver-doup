// dist/__tests__/order.test.js

const mockUsers = [
  { username: 'testuser' } // Mocked user with a username
];

const mockServices = [
  { name: 'testservice' } // Mocked service with a name
];

jest.mock('../dist/controllers/orderController', () => ({
  create: jest.fn().mockResolvedValue({
    id: 1, // Mock ID for the created order
    userId: mockUsers[0].username, // Ensure mockUsers has valid data
    serviceId: mockServices[0].name, // Ensure mockServices has valid data
    quantity: 1,
  }),
}));

// Add the rest of your tests here
