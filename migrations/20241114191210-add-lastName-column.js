'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Add 'lastName' column only if it does not exist
    const [columns] = await queryInterface.sequelize.query("SHOW COLUMNS FROM users");
    const columnExists = columns.some(col => col.Field === 'lastName');

    if (!columnExists) {
      await queryInterface.addColumn('users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }

    // If the 'created_at' column is incorrectly referenced, remove it safely
    const columnCreatedAtExists = columns.some(col => col.Field === 'created_at');
    if (columnCreatedAtExists) {
      await queryInterface.removeColumn('users', 'created_at');
    }
  },

  async down(queryInterface, Sequelize) {
    // Drop the 'lastName' column if it exists
    await queryInterface.removeColumn('users', 'lastName');
  }
};
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Create the 'users' table with additional profile fields
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      // New columns
      profile_picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      ratings: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0.0,
      },
      reviews_count: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      // Changed JSONB to JSON for MySQL compatibility
      service_offerings: {
        type: Sequelize.JSON,  // Use Sequelize.JSON instead of Sequelize.JSONB
        allowNull: true,
      },
    });

    // Add lastName column only if it does not exist
    const [columns] = await queryInterface.sequelize.query("SHOW COLUMNS FROM users");
    const columnExists = columns.some(col => col.Field === 'lastName');

    if (!columnExists) {
      await queryInterface.addColumn('users', 'lastName', {
        type: Sequelize.STRING,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // Check if 'updated_at' column exists before dropping it
    const [columns] = await queryInterface.sequelize.query("SHOW COLUMNS FROM users");
    const columnExists = columns.some(col => col.Field === 'updated_at');
    
    if (columnExists) {
      await queryInterface.removeColumn('users', 'updated_at');
    }

    // Optionally drop other columns or revert any changes as needed
    await queryInterface.dropTable('users');
  }
};
