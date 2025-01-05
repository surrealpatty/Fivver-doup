import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';
import { User } from './user';  // Import User model for foreign key relationship
import Service from '../models/services'; // Use default import

@Table({ tableName: 'orders', timestamps: true })  // Enable timestamps if you'd like to track createdAt and updatedAt
export class Order extends Model<Order> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;  // Auto-incrementing primary key

  @ForeignKey(() => User)  // Foreign key to User model
  @Column(DataType.UUID)  // Foreign key should be UUID for consistency
  userId!: string;  // Use UUID type for userId

  @ForeignKey(() => Service)  // Foreign key to Service model
  @Column(DataType.UUID)  // Foreign key should be UUID for consistency
  serviceId!: string;  // Use UUID type for serviceId

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
