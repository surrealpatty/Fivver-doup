import { Sequelize } from 'sequelize-typescript';  // Import Sequelize from sequelize-typescript
import User from '../models/user';  // Import User model
import Service from '../models/service';  // Import Service model
import Order from '../models/order';  // Import Order model
import Review from '../models/review';  // Import Review model

// Initialize sequelize with sequelize-typescript options
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: 'password',
  database: 'fivver_doup_db',
  models: [User, Service, Order, Review],  // Add models directly in initialization
  // Optionally, you can add other sequelize configuration like logging, timezone, etc.
});

// Export sequelize instance
export { sequelize };
