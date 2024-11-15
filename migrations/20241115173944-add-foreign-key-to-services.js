module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the foreign key already exists
    const [results] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_NAME = 'services' AND TABLE_SCHEMA = 'fivver_doup_db' AND CONSTRAINT_NAME = 'fk_services_user_id';
    `);

    if (results.length === 0) {
      // Add the foreign key if it doesn't exist
      await queryInterface.addConstraint('services', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'fk_services_user_id',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Drop the foreign key constraint only if it exists
    const [results] = await queryInterface.sequelize.query(`
      SELECT CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_NAME = 'services' AND TABLE_SCHEMA = 'fivver_doup_db' AND CONSTRAINT_NAME = 'fk_services_user_id';
    `);

    if (results.length > 0) {
      await queryInterface.removeConstraint('services', 'fk_services_user_id');
    }
  },
};
