const config = {
    development: {
        db: {
            username: process.env.DB_USERNAME || 'your_db_username',
            password: process.env.DB_PASSWORD || 'your_db_password',
            database: process.env.DB_NAME || 'fivver_doup_db',
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
        },
        jwt: {
            secret: process.env.JWT_SECRET || 'your_jwt_secret',
        },
    },
    production: {
        db: {
            username: process.env.PROD_DB_USERNAME || 'your_prod_db_username',
            password: process.env.PROD_DB_PASSWORD || 'your_prod_db_password',
            database: process.env.DB_NAME || 'fivver_doup_db',
            host: process.env.DB_HOST || 'localhost',
            dialect: 'mysql',
        },
        jwt: {
            secret: process.env.PROD_JWT_SECRET || 'your_prod_jwt_secret',
        },
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

// Validate configurations for both environments
validateConfig(config.development.db);
validateConfig(config.production.db);

// Export the configuration object
module.exports = config;
// Temporary comment to force commit
// This is a test comment
