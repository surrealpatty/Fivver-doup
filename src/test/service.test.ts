// src/test/service.test.ts

import { Service } from '../models/services'; // Ensure Service model is imported
import  User  from '../models/user'; // Correct import for User model
import { sequelize } from '../config/database'; // Correct import for sequelize
import { UserRole, UserTier } from '../types/UserRoles'; // Import enums for roles and tiers

describe('Service Model', () => {
  let user: User;

  beforeAll(async () => {
    // Sync the database before running tests
    await sequelize.sync({ force: true });

    // Create a user before running tests
    user = await User.create({
      email: 'test@example.com',
      username: 'testuser',
      password: 'testpassword', // In a real scenario, this should be hashed
      role: UserRole.User, // Use the UserRole enum for role
      tier: UserTier.Paid, // Use the UserTier enum for tier
      isVerified: true, // Assuming isVerified is required for the user model
    });
  });

  afterAll(async () => {
    // Close the Sequelize connection after all tests
    await sequelize.close();
  });

  it('should define the Service model', () => {
    expect(Service).toBeDefined(); // Sanity check: Ensure the Service model is defined
  });

  it('should create a new service and return a generated ID', async () => {
    const serviceData = {
      title: 'Test Service',
      description: 'A test service',
      price: 10,
      userId: user.id.toString(), // Convert user.id to string
      role: UserRole.User, // Use the UserRole enum for role
    };

    // Create a new service
    const service = await Service.create(serviceData);

    console.log('Created service ID:', service.id); // Log the generated ID

    // Assertions to validate that the service has been created successfully
    expect(service.id).toBeDefined(); // Ensure the ID is generated and not undefined
    expect(service.userId).toBe(user.id.toString()); // Ensure userId is correctly set (as a string)
    expect(service.title).toBe('Test Service'); // Ensure title is set correctly
    expect(service.price).toBe(10); // Ensure price is set correctly
    expect(service.description).toBe('A test service'); // Ensure description is correct
    expect(service.role).toBe(UserRole.User); // Ensure role is set correctly
  });

  it('should retrieve a service by ID', async () => {
    // Create a service to retrieve
    const service = await Service.create({
      title: 'Test Service to Retrieve',
      description: 'A service for retrieving test',
      price: 20,
      userId: user.id.toString(), // Convert user.id to string
      role: UserRole.User, // Use the UserRole enum for role
    });

    const retrievedService = await Service.findByPk(service.id); // Retrieve using the created ID
    expect(retrievedService).not.toBeNull(); // Ensure the service exists
    expect(retrievedService?.title).toBe('Test Service to Retrieve'); // Ensure title matches
  });

  it('should update a service', async () => {
    // Create a service to update
    const service = await Service.create({
      title: 'Service to Update',
      description: 'A service that will be updated',
      price: 30,
      userId: user.id.toString(), // Convert user.id to string
      role: UserRole.User, // Use the UserRole enum for role
    });

    // Update the service price
    const [updatedRowsCount] = await Service.update(
      { price: 600 }, // New price
      { where: { id: service.id } } // Use the created service ID
    );

    expect(updatedRowsCount).toBe(1); // Ensure one row was updated

    // Retrieve the updated service
    const updatedService = await Service.findByPk(service.id);
    expect(updatedService?.price).toBe(600); // Ensure the price was updated correctly
  });

  it('should delete a service', async () => {
    // Create a service to delete
    const service = await Service.create({
      title: 'Service to Delete',
      description: 'A service that will be deleted',
      price: 40,
      userId: user.id.toString(), // Convert user.id to string
      role: UserRole.User, // Use the UserRole enum for role
    });

    // Delete the service
    const deletedRowsCount = await Service.destroy({
      where: { id: service.id },
    });

    expect(deletedRowsCount).toBe(1); // Ensure one row was deleted

    // Attempt to retrieve the deleted service
    const deletedService = await Service.findByPk(service.id);
    expect(deletedService).toBeNull(); // Ensure the service is no longer found
  });
});
