"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
// Define the Service model class
class Service extends sequelize_1.Model {
    // Define associations here
    static associate(models) {
        // Each service belongs to one user
        Service.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user', // You can reference it as `user` in queries
            onDelete: 'SET NULL', // If the user is deleted, the service's userId will be set to NULL
            onUpdate: 'CASCADE', // If the user ID is updated, the service's userId will be updated accordingly
        });
    }
}
// Initialize the model
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
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false, // Ensure each service has a user associated with it
        references: {
            model: 'users', // The target table (should be plural if it matches convention)
            key: 'id', // The key in the target table
        },
        onDelete: 'SET NULL', // If the associated user is deleted, set the userId to null
        onUpdate: 'CASCADE', // If the user's id is updated, update this foreign key as well
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Service',
    tableName: 'services',
    timestamps: true, // Sequelize will handle createdAt and updatedAt automatically
    underscored: true, // Use snake_case for column names (e.g., created_at, updated_at)
});
exports.default = Service;
//# sourceMappingURL=services.js.map