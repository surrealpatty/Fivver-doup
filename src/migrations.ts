export = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn('users', 'isVerified', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.removeColumn('users', 'isVerified');
    },
  };
  