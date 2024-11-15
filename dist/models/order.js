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
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW, // Set default to current timestamp
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW, // Set default to current timestamp
    },
}, {
    sequelize: database_1.sequelize,
    modelName: 'Order',
    timestamps: true, // Enable automatic timestamps (createdAt, updatedAt)
});
exports.default = Order;
//# sourceMappingURL=order.js.map