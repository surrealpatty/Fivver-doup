import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // assuming sequelize is correctly configured

export interface OrderAttributes {
    id: string;
    serviceId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
    public id!: string;
    public serviceId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Order.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        serviceId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'orders',
    }
);

export default Order;  // Ensure default export
