module.exports = {
    up: async (queryInterface, Sequelize) => {
      const table = await queryInterface.describeTable('users');
      
      // Check if the column 'updatedAt' does not exist
      if (!table.updatedAt) {
        // Add the updatedAt column
        return queryInterface.addColumn('users', 'updatedAt', {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        });
      }
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove the updatedAt column in case of rollback
      return queryInterface.removeColumn('users', 'updatedAt');
    }
  };
  