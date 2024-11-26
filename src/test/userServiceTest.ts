import { Service, ServiceCreationAttributes } from '../models/services';  // Correct named import
import User from '../models/user';  // Correct default import
import { sequelize } from '../config/database';

describe('Service Model Tests', () => {
  it('should create a new service', async () => {
    // Create a user with all required fields (password and role)
    const user = await User.create({
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword123', // Ensure password is provided
      role: 'free', // Ensure role is provided
    });

    const serviceData: ServiceCreationAttributes = {
      userId: user.id,
      title: 'Test Service',
      description: 'A test service description',
      price: 100.0,
    };

    // Ensure service is typed correctly as an instance of Service
    const service = await Service.create(serviceData);

    // Ensure the service has the correct properties
    expect(service.userId).toBe(user.id);
    expect(service.title).toBe('Test Service');
    expect(service.price).toBe(100.0);
  });
});
