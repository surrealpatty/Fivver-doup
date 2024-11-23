// src/models/order.ts

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correctly import sequelize from the config

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

Order.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        serviceId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
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
