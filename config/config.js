require('dotenv').config(); // Ensure this is at the top to load environment variables

const config = {
    development: {
        username: process.env.DB_USER || 'your_db_username',
        password: process.env.DB_PASSWORD || 'your_db_password',
        database: process.env.DB_NAME || 'fivver_doup_db',
        host: process.env.DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql', // Specify the database dialect
    },
    production: {
        username: process.env.PROD_DB_USER || 'your_prod_db_username',
        password: process.env.PROD_DB_PASSWORD || 'your_prod_db_password',
        database: process.env.PROD_DB_NAME || 'fivver_doup_db',
        host: process.env.PROD_DB_HOST || 'localhost',
        dialect: process.env.DB_DIALECT || 'mysql', // Specify the database dialect
    },
};

// Validation function to ensure required database configuration keys are set
const validateConfig = (envConfig) => {
    const requiredKeys = ['username', 'password', 'database', 'host', 'dialect'];
    for (const key of requiredKeys) {
        if (!envConfig[key]) {
            console.error(`Missing configuration key: ${key}`);
            process.exit(1); // Exit the process if a required key is missing
        }
    }
};

// Validate configurations for development environment
validateConfig(config.development);

// Validate configurations for production environment
validateConfig(config.production);

// Export the configuration object in the format Sequelize expects
module.exports = config;
