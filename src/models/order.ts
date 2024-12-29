import { Table, Column, Model, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

// Define the Order model, which represents the 'orders' table
@Table({ tableName: 'orders', timestamps: false }) // Disable timestamps if not using createdAt and updatedAt
export class Order extends Model<Order> {
  // Remove the redeclaration of the 'id' field since Sequelize handles it automatically
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number; // Declare it explicitly but without redeclaring it

  @Column(DataType.INTEGER)
  userId!: number; // Foreign key to the user who made the order

  @Column(DataType.INTEGER)
  serviceId!: number; // Foreign key to the service ordered

  @Column(DataType.STRING)
  orderDetails!: string; // Details of the order

  @Column(DataType.STRING)
  status!: string; // Status of the order (e.g., pending, completed)

  @Column(DataType.STRING)
  item!: string; // The item related to the order

  @Column(DataType.INTEGER)
  quantity!: number; // The quantity of the item ordered
}

export default Order;
