import  Service, { ServiceCreationAttributes } from '../models/services'; // Import the interface and class
import { User } from '../models/user'; // Correct named import for User
import { sequelize } from '../config/database'; // Import the sequelize instance

describe('Service Model Tests', () => {
  beforeAll(async () => {
    // Sync the database (ensure it's ready before tests)
    await sequelize.sync({ force: true });
  });

  it('should create a new service', async () => {
    // Create a user with all required fields (password and role)
   // Add tier when creating the test user
const user = await User.create({
  username: 'testUser',
  email: 'test@example.com',
  password: 'password123',
  role: 'free',  // Ensure role is provided
  tier: 'free',  // Add tier
});


    // Prepare the service data with the correct type
    const serviceData: ServiceCreationAttributes = {
      name: 'Test Service',  // Corrected to 'name' instead of 'title'
      description: 'A test service description',
      price: 100.0,
      userId: user.id,  // Associate the service with the created user
    };

    // Create the service and ensure it's properly typed
    const service = await Service.create(serviceData);

    // Check that the service has the correct properties
    expect(service.userId).toBe(user.id);
    expect(service.name).toBe('Test Service');  // Ensure 'name' is correctly used
    expect(service.price).toBe(100.0);
  });
});
