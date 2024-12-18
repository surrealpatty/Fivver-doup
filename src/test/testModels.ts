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
      tier: 'free',  // Default tier should be "free"
      isVerified: true,
      id: uuidv4(), // Generate a unique ID (assuming you're using uuid)
    });

    // Prepare the service data without the 'image' property
    const serviceData: ServiceAttributes = {
      id: 1, // Or generate a unique ID
      title: 'Test Service', // Use 'title' instead of 'name'
      description: 'A test service',
      price: 10,
      userId: String(user.id),  // Convert user.id to string (UUID)
    };

    // Create the service and ensure it's properly typed
    const service = await Service.create(serviceData);

    // Check that the service has the correct properties
    expect(service.userId).toBe(Number(user.id));  // Ensure userId is correctly typed as a number
    expect(service.title).toBe('Test Service');  // Ensure 'title' is used correctly instead of 'name'
    expect(service.price).toBe(10);  // Ensure 'price' is correctly set
  });
});
