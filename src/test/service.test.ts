import { Service } from '../models/service'; // Adjust path if necessary
import  { sequelize } from '../config/database'; // Ensure correct import of sequelize instance
import { User } from '../models/user'; // Ensure you have access to the User model for creating a user

describe('Service Model Tests', () => {
  let testUser: User;

  beforeAll(async () => {
    // Set up your test database (if needed)
    await sequelize.sync({ force: true });

    // Create a test user to associate with services
    testUser = await User.create({
      email: 'testuser@example.com',
      username: 'testuser',
      password: 'password123', // Add a password or adjust accordingly
    });
  });

  it('should create a new service', async () => {
    const service = await Service.create({
      title: 'Test Service',
      description: 'This is a test service.',
      price: 100,
      userId: testUser.id, // Ensure the service is associated with the test user
    });

    expect(service).toHaveProperty('id');
    expect(service.title).toBe('Test Service');
    expect(service.userId).toBe(testUser.id); // Ensure the userId is correctly set
  });

  it('should find all services', async () => {
    const services = await Service.findAll();
    expect(services).toBeInstanceOf(Array);
    expect(services.length).toBeGreaterThan(0); // Optionally check length
  });

  it('should update a service', async () => {
    const service = await Service.create({
      title: 'Old Service',
      description: 'This is an old service.',
      price: 50,
      userId: testUser.id, // Ensure the service is associated with the test user
    });

    service.title = 'Updated Service';
    await service.save();

    expect(service.title).toBe('Updated Service');
  });

  it('should delete a service', async () => {
    const service = await Service.create({
      title: 'Service to Delete',
      description: 'This service will be deleted.',
      price: 30,
      userId: testUser.id, // Ensure the service is associated with the test user
    });

    await service.destroy();

    const deletedService = await Service.findByPk(service.id);
    expect(deletedService).toBeNull();
  });
});
