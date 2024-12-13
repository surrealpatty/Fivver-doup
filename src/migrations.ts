import { QueryInterface, Sequelize } from 'sequelize'; // Import types

module.exports = {
  up: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    // Your migration logic here
  },

  down: async (queryInterface: QueryInterface, Sequelize: Sequelize) => {
    // Your rollback logic here
  }
};
