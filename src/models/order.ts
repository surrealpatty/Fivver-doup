import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { User } from './user';  // Import User model for foreign key relationship
import { Service } from './services';  // Import Service model for foreign key relationship

@Table({ tableName: 'orders', timestamps: false })  // Disable timestamps if not using createdAt and updatedAt
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;  // Auto-incrementing primary key

  @ForeignKey(() => User)  // Foreign key to User model
  @Column(DataType.INTEGER)
  userId!: number;  // Foreign key to the user who made the order

  @ForeignKey(() => Service)  // Foreign key to Service model
  @Column(DataType.INTEGER)
  serviceId!: number;  // Foreign key to the service ordered

  @Column(DataType.STRING)
  orderDetails!: string;  // Details of the order

  @Column(DataType.STRING)
  status!: string;  // Status of the order (e.g., pending, completed)

  @Column(DataType.STRING)
  item!: string;  // The item related to the order

  @Column(DataType.INTEGER)
  quantity!: number;  // The quantity of the item ordered
}

export default Order;
