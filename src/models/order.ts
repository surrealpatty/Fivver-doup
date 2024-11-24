// src/models/order.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Order extends Model {
  public id!: number;
  public serviceId!: number;
  public userId!: number;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,  // Important! Ensure the sequelize instance is passed in here
    tableName: 'orders',  // Name of the table
  }
);

export default Order;
