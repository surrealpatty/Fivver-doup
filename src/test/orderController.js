const request = require('supertest');  // For making HTTP requests
const app = require('../app'); // Your Express app
const { User, Service, Order } = require('../models'); // Import your models

// Mock the models (you can adjust this to fit your testing framework like Jest or Mocha)
jest.mock('../models');  // Mock Sequelize models

describe('Order Controller Tests', () => {

    beforeEach(() => {
        jest.clearAllMocks();  // Clear previous mock data before each test
    });

    // Test creating an order
    describe('POST /orders', () => {
        it('should create a new order successfully', async () => {
            // Mock the responses from Sequelize models
            User.findByPk.mockResolvedValue({ id: 1 });  // Mock a user found
            Service.findByPk.mockResolvedValue({ id: 1 });  // Mock a service found
            Order.create.mockResolvedValue({
                id: 1,
                userId: 1,
                serviceId: 1,
                orderDetails: 'Test Order',
                status: 'Pending',
            });  // Mock successful order creation

            const response = await request(app)
                .post('/orders')
                .send({
                    userId: 1,
                    serviceId: 1,
                    orderDetails: 'Test Order',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Order created successfully');
            expect(response.body.order.status).toBe('Pending');
        });

        it('should return 404 if User or Service is not found', async () => {
            User.findByPk.mockResolvedValue(null);  // Mock user not found
            Service.findByPk.mockResolvedValue(null);  // Mock service not found

            const response = await request(app)
                .post('/orders')
                .send({
                    userId: 1,
                    serviceId: 1,
                    orderDetails: 'Test Order',
                });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('User or Service not found');
        });

        it('should return 500 if there is a server error', async () => {
            User.findByPk.mockRejectedValue(new Error('Database error'));  // Mock error

            const response = await request(app)
                .post('/orders')
                .send({
                    userId: 1,
                    serviceId: 1,
                    orderDetails: 'Test Order',
                });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Server Error');
        });
    });

    // Test getting all orders
    describe('GET /orders', () => {
        it('should return all orders successfully', async () => {
            const mockOrders = [
                { id: 1, userId: 1, serviceId: 1, orderDetails: 'Test Order 1' },
                { id: 2, userId: 2, serviceId: 2, orderDetails: 'Test Order 2' },
            ];
            Order.findAll.mockResolvedValue(mockOrders);  // Mock finding all orders

            const response = await request(app).get('/orders');

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);  // Expecting two orders in the response
            expect(response.body[0].orderDetails).toBe('Test Order 1');
        });

        it('should return 500 if there is a server error', async () => {
            Order.findAll.mockRejectedValue(new Error('Database error'));  // Mock error

            const response = await request(app).get('/orders');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Server Error');
        });
    });

    // Test getting an order by ID
    describe('GET /orders/:id', () => {
        it('should return an order by ID', async () => {
            const mockOrder = { id: 1, userId: 1, serviceId: 1, orderDetails: 'Test Order' };
            Order.findByPk.mockResolvedValue(mockOrder);  // Mock finding an order by ID

            const response = await request(app).get('/orders/1');

            expect(response.status).toBe(200);
            expect(response.body.id).toBe(1);
            expect(response.body.orderDetails).toBe('Test Order');
        });

        it('should return 404 if the order is not found', async () => {
            Order.findByPk.mockResolvedValue(null);  // Mock order not found

            const response = await request(app).get('/orders/999');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Order not found');
        });

        it('should return 500 if there is a server error', async () => {
            Order.findByPk.mockRejectedValue(new Error('Database error'));  // Mock error

            const response = await request(app).get('/orders/1');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Server Error');
        });
    });

    // Test updating an order
    describe('PUT /orders/:id', () => {
        it('should update an order successfully', async () => {
            const mockOrder = { id: 1, orderDetails: 'Updated Order', status: 'Pending' };
            Order.findByPk.mockResolvedValue(mockOrder);  // Mock finding the order by ID
            Order.prototype.save.mockResolvedValue(mockOrder);  // Mock save

            const response = await request(app)
                .put('/orders/1')
                .send({ orderDetails: 'Updated Order', status: 'Completed' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Order updated successfully');
            expect(response.body.order.status).toBe('Completed');
        });

        it('should return 404 if the order is not found', async () => {
            Order.findByPk.mockResolvedValue(null);  // Mock order not found

            const response = await request(app)
                .put('/orders/999')
                .send({ orderDetails: 'Updated Order' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Order not found');
        });

        it('should return 500 if there is a server error', async () => {
            Order.findByPk.mockRejectedValue(new Error('Database error'));  // Mock error

            const response = await request(app)
                .put('/orders/1')
                .send({ orderDetails: 'Updated Order' });

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Server Error');
        });
    });

    // Test deleting an order
    describe('DELETE /orders/:id', () => {
        it('should delete an order successfully', async () => {
            const mockOrder = { id: 1, orderDetails: 'Test Order' };
            Order.findByPk.mockResolvedValue(mockOrder);  // Mock finding the order by ID
            Order.prototype.destroy.mockResolvedValue(true);  // Mock delete

            const response = await request(app).delete('/orders/1');

            expect(response.status).toBe(200);
            expect(response.body.message).toBe('Order deleted successfully');
        });

        it('should return 404 if the order is not found', async () => {
            Order.findByPk.mockResolvedValue(null);  // Mock order not found

            const response = await request(app).delete('/orders/999');

            expect(response.status).toBe(404);
            expect(response.body.message).toBe('Order not found');
        });

        it('should return 500 if there is a server error', async () => {
            Order.findByPk.mockRejectedValue(new Error('Database error'));  // Mock error

            const response = await request(app).delete('/orders/1');

            expect(response.status).toBe(500);
            expect(response.body.message).toBe('Server Error');
        });
    });
});
