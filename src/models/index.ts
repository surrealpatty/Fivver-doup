import express from 'express';
import { sequelize } from './config/database'; // Make sure the import path is correct
import { models } from './models'; // Import all models from the models directory
import routes from './routes'; // Assuming you have a routes directory

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);  // Assuming routes are set up in the 'routes' directory

// Set up associations for models
const { User, Service, Order } = models;

// Test the connection and sync the models with the database
sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return sequelize.sync({ alter: true });  // Sync models if needed (altering existing tables)
    })
    .then(() => {
        console.log('Database synced');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
