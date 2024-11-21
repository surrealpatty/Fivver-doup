import express from 'express';
import { sequelize } from './config/database';  // Import the Sequelize instance
import { User } from './models/user';  // Example import of your User model

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('Welcome to Fiverr Clone!');
});

// Example of checking database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established.');
  })
  .catch((error: Error) => {
    console.error('Unable to connect to the database:', error);
  });

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };  // Export app for use in testing or elsewhere
