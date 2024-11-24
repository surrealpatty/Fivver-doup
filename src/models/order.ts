// src/models/order.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { OrderAttributes, OrderCreationAttributes } from '../types/order'; // Import OrderAttributes

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public serviceId!: string;
  public status!: string;           // Add status
  public quantity!: number;        // Add quantity
  public totalPrice!: number;      // Add totalPrice
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
    status: {
      type: DataTypes.STRING,
      allowNull: false, // Set appropriate constraints as per your use case
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false, // Set appropriate constraints as per your use case
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false, // Set appropriate constraints as per your use case
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true, // Ensure that Sequelize automatically manages createdAt and updatedAt
  }
);

export default Order; // Ensure default export
