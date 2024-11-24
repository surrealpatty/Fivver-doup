import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import { User } from '../models/user';  // Import User model
import Service from '../models/service';  // Import Service model
import Order from '../models/order';  // Import Order model
import Review from '../models/review';  // Import Review model

// Initialize sequelize with sequelize-typescript options
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', // Replace with your database host if needed
  username: 'root',  // Replace with your database username
  password: 'password', // Replace with your database password
  database: 'fivver_doup_db', // Replace with your database name
  models: [User, Service, Order, Review],  // Add models directly in initialization
  logging: console.log,  // Optional: log SQL queries
  timezone: '+00:00',  // Optional: configure the timezone, if necessary
});

// Export sequelize instance
export { sequelize };
