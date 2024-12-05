import { Sequelize } from 'sequelize-typescript';  // Correct import for sequelize-typescript
import path from 'path';

// Initialize Sequelize instance with sequelize-typescript
export const sequelize = new Sequelize({
  dialect: 'mysql',   // Use the MySQL dialect
  host: 'localhost',  // Your database host (e.g., localhost)
  username: 'root',   // Your database username
  password: '',       // Your database password
  database: 'fiverr_doup', // Your database name
  models: [path.join(__dirname, '../models')], // Ensure the path to models is correct (relative to config folder)
});

export const testConnection = sequelize.authenticate;