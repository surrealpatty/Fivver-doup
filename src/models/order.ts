import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Named import of sequelize

// Define the attributes for the Order model
export interface OrderAttributes {
    id: number;
    userId: number;
    serviceId: number;
    quantity: number;
    totalPrice: number;
    totalAmount: number;
    orderDetails?: string;
    status: string;
}

// Define the creation attributes for the Order model
export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: number;
    public userId!: number;
    public serviceId!: number;
    public quantity!: number;
    public totalPrice!: number;
    public totalAmount!: number;
    public orderDetails?: string;
    public status!: string;
}

// Initialize the Order model with Sequelize
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
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        orderDetails: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pending',
        },
    },
    {
        sequelize,  // Pass the sequelize instance to the model
        tableName: 'orders',  // The table name in the database
        modelName: 'Order',  // The model name in Sequelize
        timestamps: true,     // Enable timestamps (createdAt, updatedAt)
    }
);

export default Order;
