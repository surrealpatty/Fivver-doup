"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('Role-based Access Tests', ()=>{
    let testUser;
    beforeAll(async ()=>{
        // Register a new user with the role 'free'
        const response = await (0, _supertest.default)(_index.app).post('/register') // Replace with your actual registration route
        .send({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password',
            role: 'free'
        });
        // Extract the user id and token from the response
        testUser = {
            id: response.body.id,
            token: response.body.token
        };
        // Ensure the response contains token and id
        expect(response.statusCode).toBe(201); // Expect successful user creation
        expect(testUser).toHaveProperty('id');
        expect(testUser).toHaveProperty('token');
    });
    afterAll(async ()=>{
        // Clean up the database by deleting the test user
        if (testUser && testUser.id) {
            await (0, _supertest.default)(_index.app).delete(`/users/${testUser.id}`) // Replace with your actual user deletion route
            .set('Authorization', `Bearer ${testUser.token}`); // Authenticate the request
        }
    });
    it('should confirm the test file is running successfully', ()=>{
        console.log('Test file is running successfully!');
        expect(true).toBe(true); // Basic sanity check
    });
    it('should respond with a message from the root endpoint', async ()=>{
        const response = await (0, _supertest.default)(_index.app).get('/'); // Test the root endpoint
        expect(response.statusCode).toBe(200); // Expect success
        expect(response.text).toBe('Fiverr backend is running'); // Confirm the correct message
    });
    it('should deny access to premium service for free users', async ()=>{
        const response = await (0, _supertest.default)(_index.app).get('/premium-service') // Replace with your actual premium service route
        .set('Authorization', `Bearer ${testUser.token}`); // Authenticate with the test user token
        expect(response.statusCode).toBe(403); // Expect forbidden status
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
    it('should allow access to premium service for paid users', async ()=>{
        // Update the user role to 'paid'
        const paidUserResponse = await (0, _supertest.default)(_index.app).post('/update-role') // Replace with your actual role update route
        .send({
            userId: testUser.id,
            role: 'paid'
        }).set('Authorization', `Bearer ${testUser.token}`); // Authenticate the role update request
        // Extract the updated token for the paid user
        const paidUserToken = paidUserResponse.body.token;
        expect(paidUserResponse.statusCode).toBe(200); // Expect role update success
        expect(paidUserResponse.body).toHaveProperty('token');
        const response = await (0, _supertest.default)(_index.app).get('/premium-service') // Replace with your actual premium service route
        .set('Authorization', `Bearer ${paidUserToken}`); // Authenticate with the updated token
        expect(response.statusCode).toBe(200); // Expect successful access
        expect(response.body.message).toBe('Premium service access granted.');
    });
});
