import { ServiceAttributes } from '../models/services';
import { User } from '../models/user'; // Ensure correct import for User model
import { sequelize } from '../config/database'; // Correct import for sequelize
import { v4 as uuidv4 } from 'uuid'; // Ensure uuidv4 is imported
import { Service } from '../models/services'; // Correct named import for Service

describe('Service Model Tests', () => {
  let user: User; // Declare user at the top to use across tests

  beforeAll(async () => {
    // Sync the database (ensure it's ready before tests)
    await sequelize.sync({ force: true });

    // Create a user before tests
    user = await User.create({
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
      role: 'free',
      tier: 'free',
      isVerified: true,
    });
  });

  afterAll(async () => {
    // Close the database connection after tests
    await sequelize.close();
  });

  it('should create a new service', async () => {
    // Define service attributes with a valid UUID (generate UUID here)
    const serviceData: ServiceAttributes = {
      id: uuidv4(), // Generate a valid UUID string for the service id
      title: 'Test Service',
      description: 'A test service',
      price: 10,
      userId: user.id, // Ensure user.id is a valid UUID string
    };

    // Create the service using the defined attributes
    const service = await Service.create(serviceData);

    // Assertions to validate the creation of the service
    expect(service.id).toBeDefined(); // Ensure the ID is generated
    expect(service.userId).toBe(user.id); // Compare UUID string to UUID string
    expect(service.title).toBe('Test Service');
    expect(service.price).toBe(10);
    expect(service.description).toBe('A test service');
  });
});
