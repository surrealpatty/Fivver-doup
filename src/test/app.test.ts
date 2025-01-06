import { Sequelize } from 'sequelize-typescript';  // Correct Sequelize import
import { User } from '../models/user';  // Ensure User is correctly imported
import Service from '../models/services';  // Correct import for the Service model
import dotenv from 'dotenv';  // Import dotenv for environment variables

dotenv.config();  // Load environment variables from .env file

let sequelizeInstance: Sequelize;  // Declare sequelizeInstance for later use

// Initialize Sequelize with models explicitly
beforeAll(async () => {
  sequelizeInstance = new Sequelize({
    dialect: 'mysql',
    host: process.env.TEST_DB_HOST,  // Use environment variables
    username: process.env.TEST_DB_USERNAME as string,
    password: process.env.TEST_DB_PASSWORD as string,
    database: process.env.TEST_DB_NAME as string,
    models: [User, Service],  // Ensure both models are included
  });

  // Add models to Sequelize instance
  sequelizeInstance.addModels([User, Service]);

  // Sync the database (force: true resets the tables)
  await sequelizeInstance.sync({ force: true });
});

// Test cases go here

// Cleanup after all tests are done
afterAll(async () => {
  // Close the Sequelize connection after tests
  await sequelizeInstance.close();
});
