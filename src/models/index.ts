import { Sequelize, ModelCtor } from 'sequelize-typescript'; // Import the correct type for ModelCtor
import User from './user'; // Import the default export from the User model
import Service from './service'; // Import the default export from the Service model
import Review from './review'; // Import the default export from the Review model
import Order from './order'; // Add Order to the models

// Create an instance of Sequelize with sequelize-typescript configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Adjust as necessary
  database: 'fivver_doup', // Adjust as necessary
  username: 'root', // Adjust as necessary
  password: 'password', // Adjust as necessary
  models: [User, Service, Review, Order] as ModelCtor[], // Explicitly cast to ModelCtor[] (required by sequelize-typescript)
  logging: false, // Optional: disable logging if not needed
});

// Sync associations and ensure models are exported
const initModels = async () => {
  try {
    // Sync models with the database (use `sequelize.sync()` to sync your models)
    await sequelize.sync({ force: false }); // Set `force: true` if you want to drop tables
    console.log('Models synchronized with the database');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
};

// src/models/index.ts

export { Service, ServiceCreationAttributes } from './service';
export { User } from './user';
