import 'reflect-metadata';  // Ensure reflect-metadata is imported first
import express from 'express';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';  // Import the User model
import { Review } from './models/review';  // Import the Review model
import premiumServiceRoutes from './routes/premiumService';  // Default import
import userRoutes from './routes/user';  // Import the user routes
import serviceRoutes from './routes/service';  // Import the service routes
import authRouter from './routes/auth';  // Import the auth router

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register the routes
app.use('/api/premium-service', premiumServiceRoutes);  // Correct use of premiumServiceRoutes
app.use('/api/users', userRoutes);  // Mount user routes under '/api/users'
app.use('/api/services', serviceRoutes);  // Mount service routes under '/api/services'
app.use('/auth', authRouter);  // Mount auth routes under '/auth'

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.status(200).send('Fiverr backend is running');
});

// Sequelize initialization
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  host: process.env.DB_HOST, // Add host from .env for flexibility
  dialect: 'mysql',  // Set the database dialect
  models: [User, Review],  // Add your models here
});

// Synchronize database and start the server only if the file is not imported as a module
let server: any;  // Declare a variable to hold the server instance

if (require.main === module) {  // Ensure this is the main module being executed
  sequelize
    .sync({ alter: true })  // Ensure the database schema is updated (optional)
    .then(() => {
      console.log('Database synchronized successfully.');

      // Start the server after the database is synchronized
      server = app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
      });
    })
    .catch((error) => {
      console.error('Error synchronizing the database:', error.message);
    });
}

// Export the server and app for testing purposes
export { server, app, sequelize };
