"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
require("reflect-metadata");
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _jsonwebtoken = /*#__PURE__*/ _interop_require_default(require("jsonwebtoken"));
const _dotenv = /*#__PURE__*/ _interop_require_default(require("dotenv"));
const _sequelize = require("sequelize");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _services = require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
_dotenv.default.config(); // Load environment variables
let sequelizeInstance; // Initialize Sequelize instance
beforeAll(async ()=>{
    sequelizeInstance = new _sequelize.Sequelize({
        dialect: 'mysql',
        host: process.env.TEST_DB_HOST,
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME
    });
    // Set models and define associations
    sequelizeInstance.models.User = _user.default;
    sequelizeInstance.models.Service = _services.Service;
    _services.Service.belongsTo(_user.default, {
        foreignKey: 'userId'
    });
    _user.default.hasMany(_services.Service, {
        foreignKey: 'userId'
    });
    // Authenticate and sync models
    await sequelizeInstance.authenticate();
    await sequelizeInstance.sync({
        force: true
    });
});
describe('Authentication Tests', ()=>{
    it('should register a user and return a valid JWT token', async ()=>{
        const response = await (0, _supertest.default)(_index.default).post('/users/register').send({
            email: 'authuser@example.com',
            password: 'securepassword',
            username: 'authuser'
        });
        expect(response.status).toBe(201); // Ensure user is created successfully
        expect(response.body.token).toBeDefined(); // Verify token is returned
        const decoded = _jsonwebtoken.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id'); // Verify token contains user ID
    });
    it('should login a user and return a valid JWT token', async ()=>{
        const response = await (0, _supertest.default)(_index.default).post('/users/login').send({
            email: 'authuser@example.com',
            password: 'securepassword'
        });
        expect(response.status).toBe(200); // Ensure login is successful
        expect(response.body.token).toBeDefined(); // Verify token is returned
        const decoded = _jsonwebtoken.default.verify(response.body.token, process.env.JWT_SECRET || 'your-secret-key');
        expect(decoded).toHaveProperty('id'); // Verify token contains user ID
        expect(decoded).toHaveProperty('email'); // Verify token contains email
    });
    it('should reject login with invalid credentials', async ()=>{
        const response = await (0, _supertest.default)(_index.default).post('/users/login').send({
            email: 'invaliduser@example.com',
            password: 'wrongpassword'
        });
        expect(response.status).toBe(401); // Unauthorized status
        expect(response.body.message).toBe('Invalid credentials');
    });
    it('should reject a request with an expired token', async ()=>{
        const expiredToken = _jsonwebtoken.default.sign({
            id: 1,
            email: 'authuser@example.com'
        }, process.env.JWT_SECRET || 'your-secret-key', {
            expiresIn: '-1s'
        } // Token is already expired
        );
        const response = await (0, _supertest.default)(_index.default).get('/protected-route') // Replace with your protected route
        .set('Authorization', `Bearer ${expiredToken}`);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });
    it('should reject a request with a malformed token', async ()=>{
        const response = await (0, _supertest.default)(_index.default).get('/protected-route') // Replace with your protected route
        .set('Authorization', 'Bearer malformed.token.value');
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Unauthorized');
    });
});
afterAll(async ()=>{
    await sequelizeInstance.close(); // Close the Sequelize connection
});
