import request from 'supertest'; // Import request for HTTP testing
import { User } from '../models/user'; // Adjust based on your project structure
import Service from '../models/services'; // Adjust based on your project structure
import { sequelize } from '../config/database'; // Adjust based on your project structure
import app from '../index'; // Adjust this import to point to your Express app
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for generating JWT token

// Generate a JWT token for testing (assuming you have JWT-based authentication)
const paidToken = jwt.sign({ id: '1', role: 'Paid' }, process.env.JWT_SECRET as string);

describe('Service Model', () => {
  let serviceId: string;

  beforeAll(async () => {
    // Sync the database before tests
    await sequelize.sync();
  });

  it('should associate userId correctly when creating a service', async () => {
    // Step 1: Create the user first
    const user = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123', // Ensure this matches your actual User model
      role: 'Free', // Assuming 'role' is a required field
      tier: 'Tier1', // Assuming 'tier' is a required field
      isVerified: true, // Assuming 'isVerified' is a required field
    });

    // Step 2: Create the service and associate it with the user
    const service = await Service.create({
      title: 'Test Service',
      description: 'Service Description',
      price: 10,
      userId: user.id, // Correctly associate the userId
    });

    // Step 3: Verify the service is correctly associated with the user
    expect(service.userId).toBe(user.id); // This should pass if association is correct

    // Store the serviceId for later tests
    serviceId = service.id;
  });

  it('should return 404 if the service is not found', async () => {
    const response = await request(app)
      .put('/services/9999')  // Assuming service with ID 9999 does not exist
      .set('Authorization', `Bearer ${paidToken}`)
      .send({ 
        title: 'Non-existent Service' 
      });

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Service not found');
  });

  it('should return 400 if the price is invalid', async () => {
    const response = await request(app)
      .put(`/services/${serviceId}`)
      .set('Authorization', `Bearer ${paidToken}`)
      .send({ 
        title: 'Invalid Service Title', 
        description: 'Description with invalid price', 
        price: 'invalid' // Invalid price value
      });

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid price value');
  });
});
