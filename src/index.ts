import 'reflect-metadata';  // Ensure reflect-metadata is imported first
import express from 'express';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { User } from './models/user';  // Import the User model
import { Review } from './models/review';  // Import the Review model
import premiumServiceRoute from './routes/premiumService';
import userRoutes from './routes/user';
import serviceRoutes from './routes/service';
import authRouter from './routes/auth';  // Import the auth router

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Register the routes
app.use('/api/premium-service', premiumServiceRoute); // Mount premium service routes under '/api/premium-service'
app.use('/api/users', userRoutes); // Mount user routes under '/api/users'
app.use('/api/services', serviceRoutes); // Mount service routes under '/api/services'
app.use('/auth', authRouter); // Mount auth routes under '/auth'

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.status(200).send('Fiverr backend is running');
});

// Sequelize initialization
const sequelize = new Sequelize({
  username: process.env.DB_USERNAME as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  models: [User, Review],  // Add your models here
  dialect: 'mysql',  // Set the database dialect
});

// Synchronize database and start server only if the file is not imported as a module
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
