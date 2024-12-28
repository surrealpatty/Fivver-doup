import { Service, ServiceCreationAttributes } from '../models/service'; // Correct path
import { User } from '../models/user'; // Correct named import

describe('Service Model Tests', () => {
  it('should create a new service', async () => {
    // Create a user with all required fields (including 'isPaid')
    const user = await User.create({
      username: 'testUser',
      email: 'test@example.com',
      password: 'testPassword123', // Ensure password is provided
      role: 'free', // Ensure role is provided
      isPaid: false, // Add the missing 'isPaid' property
    });

    const serviceData: ServiceCreationAttributes = {
      userId: user.id, // Pass userId as a number (no .toString() here)
      title: 'Test Service',
      description: 'A test service description',
      price: 100.0,
    };

    // Ensure service is typed correctly as an instance of Service
    const service = await Service.create(serviceData);

    // Ensure the service has the correct properties
    expect(service.userId).toBe(user.id); // Check if userId is a number
    expect(service.title).toBe('Test Service');
    expect(service.price).toBe(100.0);
  });
});
