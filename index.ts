import express from 'express';
import { sequelize, models } from './models';  // Import sequelize instance and models from models/index.ts

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
models.User.findAll()  // You can query the User model like this
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
