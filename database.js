const { Sequelize } = require('sequelize');

// Create a new Sequelize instance with configuration from the environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql', // Change this to your database dialect (e.g., 'postgres', 'sqlite', etc. if needed)
});

// Test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the test function
testConnection();

// Export the Sequelize instance
module.exports = { sequelize };
