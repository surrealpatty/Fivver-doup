"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Order extends sequelize_1.Model {
    // Define associations inside the `associate` method
    static associate(models) {
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
        Order.belongsTo(models.Service, {
            foreignKey: 'serviceId',
            as: 'service',
        });
    }
}
// Initialize the model
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto increment the id
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize, // Reference to Sequelize instance
    modelName: 'Order',
    tableName: 'orders', // Ensure it matches the table name
    timestamps: true, // Enable automatic timestamps (createdAt, updatedAt)
    createdAt: 'createdAt', // Explicitly define custom timestamps if necessary
    updatedAt: 'updatedAt',
});
exports.default = Order;
//# sourceMappingURL=order.js.map