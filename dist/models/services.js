"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Correctly import sequelize instance
class Service extends sequelize_1.Model {
    // Define the associate method to establish relationships
    static associate(models) {
        // Define the association with the User model
        Service.belongsTo(models.User, {
            foreignKey: 'user_id', // Foreign key is user_id
            onDelete: 'SET NULL', // Set user_id to NULL if the user is deleted
            onUpdate: 'CASCADE', // Update user_id if the user's id is updated
        });
    }
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true, // user_id can be nullable if the user is deleted
        references: {
            model: 'users', // Reference the "users" table
            key: 'id',
        },
        onDelete: 'SET NULL', // Set user_id to NULL if the referenced user is deleted
        onUpdate: 'CASCADE', // Update user_id if the referenced user's id is updated
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: database_1.sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: database_1.sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
}, {
    sequelize: database_1.sequelize, // Pass the sequelize instance
    modelName: 'Service', // The name of the model
    tableName: 'services', // The table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
});
// Export the model
exports.default = Service;
//# sourceMappingURL=services.js.map