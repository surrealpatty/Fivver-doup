import request from 'supertest'; // Ensure supertest is installed
import app from '../../dist/app'; // Import your Express app from transpiled code (adjust if needed)
import user from '../../src/models/user'; // Correct path to User model
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // Ensure jwt is imported

// Mock environment variable for JWT secret
process.env.JWT_SECRET = 'testsecret';

// Mocking jwt to avoid errors during tests
jest.mock('jsonwebtoken');

// Mock User model methods
jest.mock('../../src/models/user', () => ({
  findOne: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

describe('User Controller', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  test('should register a new user', async () => {
    // Mock User.findOne to simulate that the user does not exist
    (User.findOne as jest.Mock).mockResolvedValue(null);
    
    // Mock User.create to simulate successful user creation
    (User.create as jest.Mock).mockResolvedValue({
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedpassword', // Simulating the hashed password
    });

    const response = await request(app).post('/api/users/register').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'testpassword',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'testuser');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('should login a user and return a token', async () => {
    const hashedPassword = await bcrypt.hash('testpassword', 10);

    // Mock User.findOne to simulate user found with a hashed password
    (User.findOne as jest.Mock).mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      password: hashedPassword,
    });

    // Mocking JWT to avoid actual verification process
    const mockToken = 'mock.jwt.token';
    jwt.sign = jest.fn().mockReturnValue(mockToken); // Mock JWT signing

    const response = await request(app).post('/api/users/login').send({
      email: 'test@example.com',
      password: 'testpassword',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', mockToken); // Ensure token is returned
  });

  test('should return user profile', async () => {
    // Mock the JWT verification process
    const mockToken = 'mock.jwt.token';
    jwt.verify = jest.fn().mockReturnValue({ userId: 1 }); // Mock JWT token verification
    
    const mockUser = {
      id: 1,
      username: 'testuser',
      email: 'test@example.com',
    };

    // Mock User.findByPk to return the mocked user
    (User.findByPk as jest.Mock).mockResolvedValue(mockUser);

    const response = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  test('should update user profile', async () => {
    const mockToken = 'mock.jwt.token';

    // Mock User.update to simulate a successful profile update
    (User.update as jest.Mock).mockResolvedValue([1]); // Simulate one row updated

    const response = await request(app)
      .put('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`)
      .send({ username: 'updatedUser' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Profile updated successfully');
  });

  test('should delete user account', async () => {
    const mockToken = 'mock.jwt.token';

    // Mock User.destroy to simulate a successful account deletion
    (User.destroy as jest.Mock).mockResolvedValue(1); // Simulate user deletion

    const response = await request(app)
      .delete('/api/users/profile')
      .set('Authorization', `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'User deleted successfully');
  });
});
