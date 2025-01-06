"use strict";
const supertest = require("supertest");
const { app } = require("../../index"); // Ensure correct import path for your app
const dotenv = require("dotenv"); // Load environment variables
const { Sequelize } = require("sequelize-typescript"); // Sequelize import for the test database
const { Service } = require("../../models/services"); // Correct import path for the Service model

// Mocking the Service model methods
jest.mock("../../models/services", () => ({
    Service: {
        create: jest.fn(),
        findOne: jest.fn(),
    },
}));

// Load environment variables from .env file
dotenv.config();

// Sequelize initialization for the test database
const sequelize = new Sequelize({
    username: process.env.TEST_DB_USERNAME, // Use test DB credentials
    password: process.env.TEST_DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.TEST_DB_HOST,
    dialect: "mysql",
    models: [Service], // Add models to Sequelize initialization
});

// Sync database before tests
beforeAll(async () => {
    await sequelize.sync({ force: true }); // This will drop and recreate tables for each test
});

// Retry logic for all tests in this suite
beforeEach(() => {
    jest.retryTimes(3); // Retries failed tests 3 times before reporting an error
});

describe("Service Tests", () => {
    describe("POST /api/services/create", () => {
        it("should create a service successfully", async () => {
            // Mock resolved value for Service.create
            Service.create.mockResolvedValueOnce({
                id: "1",
                title: "Test Service",
                description: "This is a test service",
                price: 100,
            });

            // Send a POST request to create service endpoint
            const response = await supertest(app).post("/api/services/create").send({
                title: "Test Service",
                description: "This is a test service",
                price: 100,
            });

            // Verify the response
            expect(response.status).toBe(201); // Expecting a 201 Created status
            expect(response.body).toHaveProperty("id");
            expect(response.body.title).toBe("Test Service");

            // Verify that Service.create was called with the correct parameters
            expect(Service.create).toHaveBeenCalledWith({
                title: "Test Service",
                description: "This is a test service",
                price: 100,
            });
        });

        it("should return an error if service creation fails", async () => {
            // Mock rejected value for Service.create
            Service.create.mockRejectedValueOnce(new Error("Service creation failed"));

            const response = await supertest(app).post("/api/services/create").send({
                title: "Test Service",
                description: "This is a test service",
                price: 100,
            });

            expect(response.status).toBe(400); // Expecting a 400 Bad Request status
            expect(response.body).toHaveProperty("error", "Service creation failed");
        });
    });
});
