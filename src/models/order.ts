// src/models/order.ts
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define Order attributes
interface OrderAttributes {
  id: number;
  serviceId: number;
  status: string;
  quantity: number;
  totalPrice: number;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public serviceId!: number;
  public status!: string;
  public quantity!: number;
  public totalPrice!: number;
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    serviceId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    totalPrice: { type: DataTypes.FLOAT, allowNull: false },
  },
  { sequelize, tableName: 'orders' }
);

export default Order;
