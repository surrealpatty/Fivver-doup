import { sequelize } from '../config/database'; // Correct import
import { server } from '../index'; // Import the server instance
// Global teardown to ensure cleanup of resources after all tests
afterAll(async () => {
    // Close the database connection if it exists
    if (sequelize) {
        await sequelize.close();
        console.log('Database connection closed.');
    }
    // Close the server if it has a close method (now using the HTTP server)
    if (server && typeof server.close === 'function') {
        await new Promise((resolve) => {
            server.close(() => {
                resolve();
                console.log('Server closed.');
            });
        });
    }
});
//# sourceMappingURL=globalTeardown.js.map