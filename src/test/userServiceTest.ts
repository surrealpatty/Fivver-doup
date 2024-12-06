// src/test/userServiceTest.ts
import Service, { ServiceCreationAttributes } from '../models/services';  // Import the interface and class
import { User } from '../models/user'; // Correct named import for User
import  sequelize  from '../config/database'; // Import the sequelize instance

describe('Service Model Tests', () => {
  beforeAll(async () => {
    // Sync the database (ensure it's ready before tests)
    await sequelize.sync({ force: true });
  });

  it('should create a new service', async () => {
    // Create a user with all required fields (password and role)
    const user = await User.create({
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword123',
      role: 'free', // Ensure role is provided
    });

    // Prepare the service data with the correct type
    const serviceData: ServiceCreationAttributes = {
      userId: user.id,
      title: 'Test Service',
      description: 'A test service description',
      price: 100.0,
    };

    // Create the service and ensure it's properly typed
    const service = await Service.create(serviceData);

    // Check that the service has the correct properties
    expect(service.userId).toBe(user.id);
    expect(service.title).toBe('Test Service');
    expect(service.price).toBe(100.0);
  });
});
