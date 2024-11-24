import { ForeignKey, Column, DataType, Model, Table } from 'sequelize-typescript';
import User from './user';
import Service from './service'; // Import the Service model
import { ModelCtor } from 'sequelize-typescript'; // Import ModelCtor for explicit typing

interface OrderAttributes {
  id: number;
  userId: number;
  serviceId: number;
  quantity: number;
  totalPrice: number;
  totalAmount: number;
  orderDetails?: string;
  status: string;
}

@Table({ tableName: 'orders', timestamps: true })
class Order extends Model<OrderAttributes> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  
  @Column({ type: DataType.INTEGER, allowNull: false })
  serviceId!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  quantity!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  totalPrice!: number;

  @Column({ type: DataType.FLOAT, allowNull: false })
  totalAmount!: number;

  @Column({ type: DataType.STRING, allowNull: true })
  orderDetails?: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Pending' })
  status!: string;
}

// Define associations for the Order model
Order.belongsTo(User, { foreignKey: 'userId' });
// Explicitly cast Service to ModelCtor after unknown
Order.belongsTo(Service as unknown as ModelCtor, { foreignKey: 'serviceId' });

export default Order;
