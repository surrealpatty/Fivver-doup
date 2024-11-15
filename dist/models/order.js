"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const user_1 = __importDefault(require("./user")); // Ensure this is correctly imported
const services_1 = __importDefault(require("./services")); // Ensure this is correctly imported
class Order extends sequelize_1.Model {
    // Define associations inside the `associate` method
    static associate(models) {
        // Each Order belongs to a User (foreign key `userId`)
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        // Each Order belongs to a Service (foreign key `serviceId`)
        Order.belongsTo(models.Service, {
            foreignKey: 'serviceId',
            as: 'service',
        });
    }
}
// Initialize the Order model
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto increment the id
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: services_1.default,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    orderDetails: {
        type: sequelize_1.DataTypes.STRING, // Adjust type based on your needs
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('Pending', 'Completed', 'Cancelled'), // Use ENUM for status
        allowNull: false,
        defaultValue: 'Pending', // Default status to 'Pending'
    },
}, {
    sequelize: database_1.sequelize, // Reference the sequelize instance
    modelName: 'Order',
    tableName: 'orders', // Ensure it matches the table name
    timestamps: true, // Sequelize will automatically handle `createdAt` and `updatedAt`
    underscored: true, // Use snake_case for column names (e.g., `created_at`)
});
exports.default = Order;
//# sourceMappingURL=order.js.map