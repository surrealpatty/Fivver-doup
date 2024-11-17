import { sequelize } from '../config/database'; // Correct import path for sequelize
import User from './user'; // Default import for User model
import Service from './services'; // Default import for Service model
import Order from './order'; // Default import for Order model
// Initialize models
const models = {
    User,
    Service,
    Order,
};
// Set up associations (only if the associate method is defined)
Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});
// Test the database connection and sync the models
sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected');
    return sequelize.sync({ alter: true }); // Sync models with the database (alter if needed)
})
    .then(() => {
    console.log('Database synced');
})
    .catch((err) => {
    console.error('Database connection failed:', err);
});
// Explicitly export models so they are accessible elsewhere
export { models, User, Service, Order, sequelize };
