import { sequelize } from '../config/database'; // Import sequelize instance
/**
 * Sync the database and reset the schema before running tests
 */
const syncDatabase = async () => {
    try {
        console.log('Connecting to the database...');
        await sequelize.authenticate(); // Authenticate the connection
        console.log('Database connected successfully!');
        console.log('Syncing database schema...');
        // Use `force: true` to drop and recreate the schema before each test run
        await sequelize.sync({ force: true });
        console.log('Database schema synced successfully!');
    }
    catch (error) {
        console.error('Error connecting to the database or syncing schema:', error);
        process.exit(1); // Exit the process if the connection or sync fails
    }
};
/**
 * Setup and teardown hooks for Jest testing
 */
beforeAll(async () => {
    console.log('Syncing the database before tests...');
    await syncDatabase(); // Sync the database before running the tests
});
afterAll(async () => {
    console.log('Closing the database connection after tests...');
    await sequelize.close(); // Close the database connection after tests complete
});
