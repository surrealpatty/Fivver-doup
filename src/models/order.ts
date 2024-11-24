import { ForeignKey, Column, DataType, Model, Table } from 'sequelize-typescript';
import User from './user';
import Service from './service';

@Table({ tableName: 'orders', timestamps: true })
class Order extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id!: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId!: number;

  @ForeignKey(() => Service)
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

Order.belongsTo(User, { foreignKey: 'userId' });
Order.belongsTo(Service, { foreignKey: 'serviceId' });

export default Order;
