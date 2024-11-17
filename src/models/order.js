// src/models/order.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user'; // Ensure this is correctly imported
import Service from './services'; // Ensure this is correctly imported
class Order extends Model {
    id;
    userId; // Allow null if user is deleted
    serviceId; // Allow null if service is deleted
    orderDetails;
    status; // Type-safe status
    createdAt;
    updatedAt;
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
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, // Auto increment the id
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allow null for ON DELETE SET NULL behavior
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: true, // Allow null for ON DELETE SET NULL behavior
        references: {
            model: Service,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    orderDetails: {
        type: DataTypes.STRING, // Adjust type based on your needs
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'), // Use ENUM for status
        allowNull: false,
        defaultValue: 'Pending', // Default status to 'Pending'
    },
}, {
    sequelize, // Reference the sequelize instance
    modelName: 'Order',
    tableName: 'orders', // Ensure it matches the table name
    timestamps: true, // Sequelize will automatically handle `createdAt` and `updatedAt`
    underscored: true, // Use snake_case for column names (e.g., `created_at`)
});
export default Order;
