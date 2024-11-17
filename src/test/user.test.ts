import express from 'express';  // Correct ES module import
import request from 'supertest'; 
import { app } from '../index';  
import User from '../models/user'; 
import jwt from 'jsonwebtoken'; 
import { sequelize } from '../config/database';  

// Mocking models and JWT for tests
jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'),  // Return mocked token on sign
    verify: jest.fn(() => ({ userId: 1 })),  // Mock the decoded token
}));

describe('User Controller', () => {

    beforeAll(() => {
        // Setup mocked responses for User model functions
        (User.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',  // This can be any mock value you want
        });

        (User.create as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',
        });

        (User.findByPk as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
        });

        (User.update as jest.Mock).mockResolvedValue([1]);  // Sequelize update returns an array, [affectedRows]
        (User.destroy as jest.Mock).mockResolvedValue(1);  // Returns number of rows affected
    });

    afterAll(async () => {
        // Ensure cleanup of any database connections after tests
        await sequelize.close();  
    });

    test('should login a user and return a token', async () => {
        const response = await request(app)
            .post('/api/users/login')  // Make sure this route exists in your Express setup
            .send({
                email: 'test@example.com',
                password: 'password123',  // Match with your mock data
            });

        console.log(response.status, response.body); 

        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('token', 'mockedToken');  // Mocked token value
    });

    test('should update user profile', async () => {
        const response = await request(app)
            .put('/api/users/profile')  // Correct route to update profile
            .set('Authorization', 'Bearer mockedToken')  // Mock Authorization header
            .send({
                email: 'updated@example.com',
                password: 'newpassword123',
            });

        console.log(response.status, response.body);  

        expect(response.status).toBe(200);  // Expect status to be 200 (OK)
        expect(response.body).toHaveProperty('id', 1);  // Check if response contains 'id'
        expect(response.body).toHaveProperty('email', 'updated@example.com');  // Check if email was updated
    });

    test('should delete user account', async () => {
        const response = await request(app)
            .delete('/api/users/profile')  // Correct route to delete profile
            .set('Authorization', 'Bearer mockedToken');  // Mock Authorization header

        console.log(response.status, response.body);  

        expect(response.status).toBe(200);  // Expect status to be 200 (OK)
        expect(response.body).toHaveProperty('message', 'User deleted successfully');  // Expect message in response
    });
});
