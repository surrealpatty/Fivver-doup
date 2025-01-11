"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _index = require("../index");
const _database = require("../config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _bcryptjs = /*#__PURE__*/ _interop_require_default(require("bcryptjs"));
const _UserRoles = require("../types/UserRoles");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('User Controller', ()=>{
    beforeAll(async ()=>{
        // Sync the Sequelize models with the database before tests run
        await _database.sequelize.sync({
            force: true
        }); // force: true will drop tables and recreate them
    });
    afterAll(async ()=>{
        // Close the Sequelize connection after tests are done
        await _database.sequelize.close();
    });
    it('should create a new user', async ()=>{
        const userPayload = {
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            isVerified: true,
            tier: _UserRoles.UserTier.Free
        };
        const response = await (0, _supertest.default)(_index.app).post('/api/users/signup').send(userPayload);
        // Ensure that the response status is 201 (Created)
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.user.username).toBe(userPayload.username);
        expect(response.body.token).toBeDefined(); // Check that the token is returned
        // Ensure password is not included in the response
        expect(response.body.user.password).toBeUndefined();
    });
    it('should not create a user if email already exists', async ()=>{
        // First, create a user
        await _user.default.create({
            username: 'existinguser',
            email: 'existinguser@example.com',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            isVerified: true,
            tier: _UserRoles.UserTier.Free
        });
        const userPayload = {
            username: 'testuser',
            email: 'existinguser@example.com',
            password: 'password123',
            role: _UserRoles.UserRole.User,
            isVerified: true,
            tier: _UserRoles.UserTier.Free
        };
        const response = await (0, _supertest.default)(_index.app).post('/api/users/signup').send(userPayload);
        // Expect a conflict (409) status due to duplicate email
        expect(response.status).toBe(409);
        expect(response.body.message).toBe('User already exists with this email.');
    });
    it('should login a user with valid credentials', async ()=>{
        const password = 'password123';
        const hashedPassword = await _bcryptjs.default.hash(password, 10);
        // Create a new user with a hashed password
        const existingUser = await _user.default.create({
            username: 'loginuser',
            email: 'loginuser@example.com',
            password: hashedPassword,
            role: _UserRoles.UserRole.User,
            isVerified: true,
            tier: _UserRoles.UserTier.Free
        });
        const loginPayload = {
            email: existingUser.email,
            password: 'password123'
        };
        const response = await (0, _supertest.default)(_index.app).post('/api/users/login').send(loginPayload);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body.token).toBeDefined(); // Check that the token is returned
    });
    it('should not login a user with invalid credentials', async ()=>{
        const loginPayload = {
            email: 'nonexistentuser@example.com',
            password: 'wrongpassword'
        };
        const response = await (0, _supertest.default)(_index.app).post('/api/users/login').send(loginPayload);
        expect(response.status).toBe(401); // Unauthorized status for invalid credentials
        expect(response.body.message).toBe('Invalid credentials');
    });
});
