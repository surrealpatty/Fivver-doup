import { Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Correctly import the sequelize instance
import * as Sequelize from 'sequelize'; // Import all Sequelize exports

// Define the attributes for the Order model
export interface OrderAttributes {
    id: number;
    userId: number;
    serviceId: number;
    status: string;
    // Add other fields if necessary
}

// Define the creation attributes for the Order model
export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {
    // `id` is optional during creation since it's auto-incremented
}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public userId!: number;
    public serviceId!: number;
    public status!: string;
    // You can add instance methods or hooks here if necessary
}

// Initialize the Order model with Sequelize
Order.init(
    {
        id: {
            type: Sequelize.DataTypes.INTEGER, // Use DataTypes from the imported `Sequelize`
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.DataTypes.INTEGER, // Use DataTypes from the imported `Sequelize`
            allowNull: false,
        },
        serviceId: {
            type: Sequelize.DataTypes.INTEGER, // Use DataTypes from the imported `Sequelize`
            allowNull: false,
        },
        status: {
            type: Sequelize.DataTypes.STRING, // Use DataTypes from the imported `Sequelize`
            allowNull: false,
        },
    },
    {
        sequelize, // Use the sequelize instance imported from the config
        tableName: 'orders', // Ensure the table name matches the one in the database
        modelName: 'Order',  // The name of the model for Sequelize to map to
        timestamps: true,    // Enable timestamps (createdAt, updatedAt)
    }
);

export default Order;
