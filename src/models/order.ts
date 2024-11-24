// src/models/order.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Order extends Model {
  public id!: number;
  public serviceId!: number;
  public status!: string;
  public quantity!: number;
  public totalPrice!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    tableName: 'orders',
  }
);

export default Order;
