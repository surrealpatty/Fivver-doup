import express, { Request, Response, NextFunction } from 'express';
import { sequelize } from './config/database'; // Corrected relative import
import User from './models/user'; // Corrected relative import
import Service from './models/services'; // Corrected relative import
import { registerUser, loginUser } from './controllers/userController'; // Corrected relative import

const app = express();

// Middleware for JSON parsing
app.use(express.json());

// Setting up model associations
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// API routes (you can add more as needed)
app.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body);  // Call registerUser and pass the request body
    res.status(201).json(user);  // Send the created user as the response
  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});

app.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);  // Call loginUser with email and password
    res.status(200).json({ token, user });  // Send the response with token and user data
  } catch (error) {
    next(error);  // Pass any errors to the error handler
  }
});

// Function to initialize the database and models
const initializeDatabase = async () => {
  try {
    // Synchronize models with the database
    await sequelize.sync({ force: true }); // Reset database

    console.log('Database synchronized.');

    // Optional: Test data creation (for testing purposes)
    const newUser = await User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    console.log('User created:', newUser.toJSON());

    const newService = await Service.create({
      title: 'Test Service',
      description: 'This is a test service description.',
      price: 100.0,
      category: 'Testing',
      userId: newUser.id, // Pass userId as a number, not a string
    });
    console.log('Service created:', newService.toJSON());
    
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Initialize database on app startup
initializeDatabase();

// Export the app for use in other files (e.g., for testing or deployment)
export { app };

// You can also start the server if this file is the entry point for your app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
