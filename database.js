const { Sequelize } = require('sequelize');

// Update the path according to your directory structure
const config = require('./config'); // Ensure this path is correct

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

// Check if the database config is defined
if (!dbConfig) {
    console.error(`No configuration found for environment: ${environment}`);
    process.exit(1); // Exit if no config found
}

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});

// Function to test the database connection
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
};

// Run the connection test
testConnection();

module.exports = sequelize;
