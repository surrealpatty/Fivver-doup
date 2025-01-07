// src/test/server.test.ts

import { app } from '../index';  // Ensure your app is properly imported
import { sequelize } from '../config/database';  // Sequelize connection
import { Service } from '../models/services';
import { User } from '../models/user';
import { Server } from 'http';  // Import Server from the http module

let server: Server;  // Explicitly define the type of the server
let user: User;

beforeAll(async () => {
  // Sync the database before running tests
  await sequelize.sync({ force: true });

  // Setup the server
  server = app.listen(3000);  // Start the server on port 3000

  // Create a user before running tests
  user = await User.create({
    email: 'test@example.com',
    username: 'testuser',
    password: 'testpassword',  // In a real scenario, this should be hashed
    role: 'user',
    tier: 'paid',  // Use 'paid' instead of 'Tier 2'
    isVerified: true,
  });
});

afterAll(async () => {
  // Ensure the server is closed after all tests
  server.close();

  // Close the Sequelize connection after all tests
  await sequelize.close();
});

describe('Service API', () => {
  it('should define the Service model', () => {
    expect(Service).toBeDefined();  // Ensure Service model is defined
  });

  it('should create a new service and return a generated ID', async () => {
    const serviceData = {
      title: 'Test Service',
      description: 'A test service',
      price: 10,
      userId: user.id,  // Associate service with user
      role: 'user',  // Valid role
    };

    // Create a new service
    const service = await Service.create(serviceData);

    console.log('Created service ID:', service.id);

    // Assertions
    expect(service.id).toBeDefined();
    expect(service.userId).toBe(user.id);
    expect(service.title).toBe('Test Service');
    expect(service.price).toBe(10);
    expect(service.description).toBe('A test service');
    expect(service.role).toBe('user');
  });

  it('should retrieve a service by ID', async () => {
    const service = await Service.create({
      title: 'Test Service to Retrieve',
      description: 'A service for retrieving test',
      price: 20,
      userId: user.id,
      role: 'user',
    });

    const retrievedService = await Service.findByPk(service.id);
    expect(retrievedService).not.toBeNull();
    expect(retrievedService?.title).toBe('Test Service to Retrieve');
  });

  it('should update a service', async () => {
    const service = await Service.create({
      title: 'Service to Update',
      description: 'A service that will be updated',
      price: 30,
      userId: user.id,
      role: 'user',
    });

    const [updatedRowsCount] = await Service.update(
      { price: 600 },
      { where: { id: service.id } }
    );

    expect(updatedRowsCount).toBe(1);

    const updatedService = await Service.findByPk(service.id);
    expect(updatedService?.price).toBe(600);
  });

  it('should delete a service', async () => {
    const service = await Service.create({
      title: 'Service to Delete',
      description: 'A service that will be deleted',
      price: 40,
      userId: user.id,
      role: 'user',
    });

    const deletedRowsCount = await Service.destroy({
      where: { id: service.id },
    });

    expect(deletedRowsCount).toBe(1);

    const deletedService = await Service.findByPk(service.id);
    expect(deletedService).toBeNull();
  });
});
