import { sequelize } from '../config/database'; // Import the Sequelize instance
import { Service } from '../models/services'; // Import the Service model

describe('Service Model Tests', () => {
  beforeAll(async () => {
    // Sync the database before running the tests
    await sequelize.sync({ force: true }); // Use `force: true` to recreate tables
  });

  afterAll(async () => {
    // Close the Sequelize connection after all tests
    await sequelize.close();
  });

  it('should define the Service model', () => {
    expect(Service).toBeDefined(); // Sanity check: Ensure the Service model is defined
  });

  it('should create a new service', async () => {
    const service = await Service.create({
      id: '123e4567-e89b-12d3-a456-426614174000', // UUID for testing
      title: 'Web Development',
      description: 'Full-stack web development services',
      price: 500,
      userId: '456e4567-e89b-12d3-a456-426614174001', // UUID for the user
    });

    expect(service).toBeDefined();
    expect(service.title).toBe('Web Development');
    expect(service.description).toBe('Full-stack web development services');
    expect(service.price).toBe(500);
    expect(service.userId).toBe('456e4567-e89b-12d3-a456-426614174001');
  });

  it('should retrieve a service by ID', async () => {
    const service = await Service.findByPk('123e4567-e89b-12d3-a456-426614174000');
    expect(service).not.toBeNull();
    expect(service?.title).toBe('Web Development');
  });

  it('should update a service', async () => {
    const [updatedRowsCount] = await Service.update(
      { price: 600 }, // New price
      { where: { id: '123e4567-e89b-12d3-a456-426614174000' } }
    );

    expect(updatedRowsCount).toBe(1);

    const updatedService = await Service.findByPk('123e4567-e89b-12d3-a456-426614174000');
    expect(updatedService?.price).toBe(600);
  });

  it('should delete a service', async () => {
    const deletedRowsCount = await Service.destroy({
      where: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });

    expect(deletedRowsCount).toBe(1);

    const deletedService = await Service.findByPk('123e4567-e89b-12d3-a456-426614174000');
    expect(deletedService).toBeNull();
  });
});
