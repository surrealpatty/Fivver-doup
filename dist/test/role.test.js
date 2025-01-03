import request from 'supertest';
import { app } from '../index'; // Ensure correct import for your app
describe('Role-based Access Tests', () => {
    let testUser;
    beforeAll(async () => {
        // Here, you can create a user in the database or mock the user data.
        const response = await request(app).post('/register') // Replace with your registration route
            .send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password',
            role: 'free', // Set role to 'free' for the test
        });
        testUser = response.body;
    });
    afterAll(async () => {
        // Clean up the database or reset state if necessary.
        await request(app).delete(`/users/${testUser.body.id}`); // Example cleanup, adjust as needed
    });
    it('should run the test file successfully', () => {
        console.log('Test file is running successfully!');
        expect(true).toBe(true); // Simple test to verify the test file is running
    });
    // Test to check if the root endpoint is responding correctly
    it('should respond with a message from the root endpoint', async () => {
        const response = await request(app).get('/'); // Send a GET request to the root endpoint
        expect(response.statusCode).toBe(200); // Expect a status code of 200 (OK)
        expect(response.text).toBe('Fiverr backend is running'); // Expect the correct response message
    });
    // Test to check role-based access (for example, 'free' role user trying to access premium service)
    it('should deny access to premium service for free users', async () => {
        const response = await request(app)
            .get('/premium-service') // Assuming your endpoint for premium access
            .set('Authorization', `Bearer ${testUser.body.token}`); // Add the token for the created test user
        expect(response.statusCode).toBe(403); // Expect a 403 Forbidden status
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
    // Test for allowed access with 'paid' role user
    it('should allow access to premium service for paid users', async () => {
        // Modify the user role to 'paid' and test again
        const paidUserResponse = await request(app)
            .post('/update-role') // Assuming you have an endpoint for updating role
            .send({
            userId: testUser.body.id,
            role: 'paid',
        });
        const response = await request(app)
            .get('/premium-service') // Assuming your endpoint for premium access
            .set('Authorization', `Bearer ${paidUserResponse.body.token}`); // Use updated role user token
        expect(response.statusCode).toBe(200); // Expect a successful access
        expect(response.body.message).toBe('Premium service access granted.');
    });
});
//# sourceMappingURL=role.test.js.map