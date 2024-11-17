import request from 'supertest'; 
import { app } from '../index';  
import User from '../models/user'; 
import jwt from 'jsonwebtoken'; 
import { sequelize } from '../config/database';  // Import the sequelize instance

jest.mock('../models/user', () => ({
    findOne: jest.fn(),
    create: jest.fn(),
    findByPk: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => 'mockedToken'),  
    verify: jest.fn(() => ({ userId: 1 })),  
}));

describe('User Controller', () => {

    beforeAll(() => {
        (User.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            email: 'test@example.com',
            password: 'hashedpassword',  
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

        (User.update as jest.Mock).mockResolvedValue([1]);  
        (User.destroy as jest.Mock).mockResolvedValue(1);  
    });

    afterAll(async () => {
        // Ensure cleanup of any database connections
        await sequelize.close();  
    });

    test('should login a user and return a token', async () => {
        const response = await request(app)
            .post('/api/users/login') 
            .send({
                email: 'test@example.com',
                password: 'password123',
            });

        console.log(response.status, response.body); 

        expect(response.status).toBe(200); 
        expect(response.body).toHaveProperty('token', 'mockedToken');  
    });

    test('should update user profile', async () => {
        const response = await request(app)
            .put('/api/users/profile')  
            .set('Authorization', 'Bearer mockedToken')  
            .send({
                email: 'updated@example.com',
                password: 'newpassword123',
            });

        console.log(response.status, response.body);  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty('id', 1);  
        expect(response.body).toHaveProperty('email', 'updated@example.com');  
    });

    test('should delete user account', async () => {
        const response = await request(app)
            .delete('/api/users/profile')  
            .set('Authorization', 'Bearer mockedToken');  

        console.log(response.status, response.body);  

        expect(response.status).toBe(200);  
        expect(response.body).toHaveProperty('message', 'User deleted successfully');  
    });
});
