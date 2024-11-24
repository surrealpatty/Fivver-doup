// src/models/order.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Order extends Model {
  public id!: number;
  public serviceId!: number; // Foreign key to Service
  public userId!: number;    // Foreign key to User
  public status!: string;    // Status of the order (e.g., pending, completed)
  public totalPrice!: number; // Total price of the order
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
  }
);

export default Order;  // Default export
