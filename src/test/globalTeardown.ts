import { server } from './index';  // Correct path to import the server instance
import { sequelize } from './config/database';  // Correct import

export default async function globalTeardown() {
  // Close the server if it has a close method
  if (server && typeof server.close === 'function') {
    await server.close();  // Close the server properly after tests
    console.log('Server closed.');
  }

  // Disconnect Sequelize connection
  if (sequelize && sequelize.close) {
    await sequelize.close();  // Close the database connection
    console.log('Sequelize connection closed.');
  }
}
