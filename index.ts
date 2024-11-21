import express from 'express';
import { sequelize } from './models/database';  // Adjust the path if necessary (assuming sequelize is in the database.ts file)
import { User } from './models/user'; // Import User model explicitly

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

// Example of using the User model
User.findAll()  // Use the imported User model directly
  .then(users => {
    console.log('Users:', users);
  })
  .catch((error: Error) => {
    console.error('Error fetching users:', error);
  });

// Starting the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { app };  // Export app for use in testing or elsewhere
