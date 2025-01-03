"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _sequelizetypescript = require("sequelize-typescript");
const _user = require("../models/user");
const _services = require("../models/services");
const _index = require("../index");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Initialize Sequelize with models
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup',
    models: [
        _user.User,
        _services.Service
    ]
});
// Define associations after models are loaded
_services.Service.belongsTo(_user.User, {
    foreignKey: 'userId'
});
_user.User.hasMany(_services.Service, {
    foreignKey: 'userId'
}); // Define the reverse association (optional)
// Sync the models before running tests
beforeAll(async ()=>{
    // Ensure the models are synced before tests run
    await sequelize.sync({
        force: true
    }); // 'force: true' will drop and re-create tables for a clean slate
});
// Clean up after tests
afterAll(async ()=>{
    await sequelize.close(); // Close the Sequelize connection after tests
});
// Example of a test with role-based access
describe('Role-based Access for Premium Service', ()=>{
    // Example test for paid user accessing premium service
    it('should allow paid users to access premium services', async ()=>{
        const paidToken = 'your-valid-paid-user-token'; // Replace with actual paid user token
        const response = await (0, _supertest.default)(_index.app).get('/premium-service') // Ensure this route exists in your app
        .set('Authorization', `Bearer ${paidToken}`); // Add token to the Authorization header
        // Debugging logs
        console.log('Response for paid user:', response.status, response.body);
        // Assert the response status and message
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Premium service access granted.');
    });
    // Test for denying free users access
    it('should deny free users from accessing premium services', async ()=>{
        const freeToken = 'your-valid-free-user-token'; // Replace with actual free user token
        const response = await (0, _supertest.default)(_index.app).get('/premium-service') // Ensure this route exists in your app
        .set('Authorization', `Bearer ${freeToken}`); // Add token to the Authorization header
        // Debugging logs
        console.log('Response for free user:', response.status, response.body);
        // Assert the response status and message
        expect(response.status).toBe(403);
        expect(response.body.message).toBe('Access denied. Only paid users can access this service.');
    });
});
