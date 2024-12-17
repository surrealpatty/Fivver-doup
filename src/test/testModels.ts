// src/test/testModels.ts
import Service, { ServiceAttributes } from '../models/services'; // Import Service and ServiceAttributes
import { User } from '../models/user'; // Correct named import for User
import { sequelize } from '../config/database'; // Import the sequelize instance
import { v4 as uuidv4 } from 'uuid';

describe('Service Model Tests', () => {
  beforeAll(async () => {
    // Sync the database (ensure it's ready before tests)
    await sequelize.sync({ force: true });
  });

  it('should create a new service', async () => {
    // Create a user with all required fields (password, role, and isVerified)
    const user = await User.create({
      username: 'testUser',
      email: 'test@example.com',
      password: 'password123',
      role: 'free',
      tier: "free",  // Default tier should be "free"
      isVerified: true,
      id: uuidv4(), // Generate a unique ID (assuming you're using uuid)
    });

    // Prepare the service data, using undefined for the 'image' field
    const serviceData: ServiceAttributes = {
      id: 1, // Or generate a unique ID 
      name: 'Test Service',
      description: 'A test service',
      price: 10,
      userId: 'your-user-id', 
      image: undefined,
    };
    // Create the service and ensure it's properly typed
    const service = await Service.create(serviceData);

    // Check that the service has the correct properties
    expect(service.userId).toBe(user.id);  // Ensure userId is a string
    expect(service.name).toBe('Test Service');  // Ensure 'name' is correctly used
    expect(service.price).toBe(100.0);
  });
});
