const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure the path is correct

class Service extends Model {
    static associate(models) {
        // Define the association with the User model
        Service.belongsTo(models.User, {
            foreignKey: 'userId', // Match the foreign key in the Service model
            as: 'user', // Alias for the User relationship
        });
    }
}

// Initialize the Service model
Service.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: 0, // Ensure price cannot be negative
            },
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Reference to the User model (not table name)
                key: 'id',
            },
        },
    },
    {
        sequelize,
        modelName: 'Service',
        tableName: 'services', // Define the table name in your database
        timestamps: true, // Automatically adds createdAt and updatedAt fields
        underscored: true, // Converts camelCase fields to snake_case in the database
    }
);

// No need to sync the model here
// Instead, manage syncing in your app.js or migration files.

module.exports = Service;
