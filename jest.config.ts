import { server } from './src/index';  // Import the server instance

module.exports = {
  // Jest configuration options
  globalTeardown: async () => {
    // Close the server instead of app.close()
    if (server && typeof server.close === 'function') {
      await server.close();  // Close the server properly after tests
      console.log('Server closed.');
    }

    // You can also close the database connection here if needed
    // if (sequelize) {
    //   await sequelize.close();
    //   console.log('Database connection closed.');
    // }
  },
  // Other Jest config options...
};
