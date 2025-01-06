import { ServiceAttributes } from '../models/services';
import User from '../models/user'; // Ensure correct import for User model
import { sequelize } from '../config/database'; // Correct import for sequelize
import { v4 as uuidv4 } from 'uuid'; // Ensure uuidv4 is imported
import { Service } from '../models/services'; // Correct named import for Service

describe('Service Model Tests', () => {
  let user: User; // Declare user at the top to use across tests

  beforeAll(async () => {
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
    await sequelize.close();
  });

  it('should create a new service', async () => {
    const serviceData: ServiceAttributes = {
      id: uuidv4(), // Generate a valid UUID string for the service id
      title: 'Test Service',
      description: 'A test service',
      price: 10,
      userId: user.id, // Ensure user.id is a valid UUID string
    };

    const service = await Service.create(serviceData);

    console.log('Created service ID:', service.id); // Log the generated ID

    // Assertions to validate the creation of the service
    expect(service.id).toBeDefined(); // Ensure service has an id assigned
    expect(service.userId).toBe(user.id); // Ensure the userId is correct
    expect(service.title).toBe('Test Service'); // Ensure the title is correct
    expect(service.price).toBe(10); // Ensure the price is correct
    expect(service.description).toBe('A test service'); // Ensure the description is correct
  });
});
