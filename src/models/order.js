"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var database_1 = require("../config/database");
var user_1 = require("./user"); // Ensure this is correctly imported
var services_1 = require("./services"); // Ensure this is correctly imported
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Define associations inside the `associate` method
    Order.associate = function (models) {
        // Each Order belongs to a User (foreign key `userId`)
        Order.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
        // Each Order belongs to a Service (foreign key `serviceId`)
        Order.belongsTo(models.Service, {
            foreignKey: 'serviceId',
            as: 'service', // Correct usage of 'as' in the association definition
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        });
    };
    return Order;
}(sequelize_1.Model));
// Initialize the Order model
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto increment the id
    },
    userId: {
        type: sequelize_1.DataTypes.UUID, // Use UUID for userId
        allowNull: true, // Allow null for ON DELETE SET NULL behavior
        references: {
            model: user_1.default,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER, // INTEGER for serviceId, since Service uses INTEGER ID
        allowNull: true, // Allow null for ON DELETE SET NULL behavior
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
    quantity: {
        type: sequelize_1.DataTypes.INTEGER, // INTEGER for quantity
        allowNull: false, // Ensure quantity is required
    },
    totalAmount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2), // DECIMAL for totalAmount (with precision and scale)
        allowNull: false, // Ensure totalAmount is required
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
