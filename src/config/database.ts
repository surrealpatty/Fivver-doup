import dotenv from 'dotenv';
import { Sequelize, Dialect } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

// List of required environment variables
const requiredKeys = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'DB_DIALECT'];

// Function to check if all required environment variables are present
const checkEnvVariables = (): void => {
    for (const key of requiredKeys) {
        if (!process.env[key]) {
            console.error(`Missing required environment variable: ${key}`);
            process.exit(1);  // Exit the process if any required variable is missing
        }
    }
};

// Check if all required environment variables are present
checkEnvVariables();

// Access environment variables and ensure they are defined
const DB_NAME: string = process.env.DB_NAME!;
const DB_USER: string = process.env.DB_USER!;
const DB_PASSWORD: string = process.env.DB_PASSWORD!;
const DB_HOST: string = process.env.DB_HOST!;
const DB_DIALECT = process.env.DB_DIALECT as Dialect;  // Type assertion to 'Dialect'

// Ensure that DB_DIALECT is one of the allowed dialects
const validDialects: Dialect[] = ['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql'];
if (!validDialects.includes(DB_DIALECT)) {
    console.error(`Invalid DB_DIALECT value: ${DB_DIALECT}. Please set a valid dialect.`);
    process.exit(1);
}

// Create a new Sequelize instance with the loaded environment variables
const sequelize = new Sequelize(
    DB_NAME,      // Database name from .env
    DB_USER,      // Database user from .env
    DB_PASSWORD,  // Database password from .env
    {
        host: DB_HOST,       // Database host from .env
        dialect: DB_DIALECT, // Database dialect (mysql, postgres, etc.) from .env
        logging: false,      // Disable Sequelize query logging
    }
);

// Test the connection to the database
const testConnection = async (): Promise<void> => {
    try {
        await sequelize.authenticate(); // Test the database connection
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);  // Exit if the connection fails
    }
};

// Call the testConnection to ensure the connection works when this file is imported
testConnection();

// Export the Sequelize instance and connection test function
export { sequelize, testConnection };
