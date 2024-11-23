import { Column, DataType, Model, Table } from 'sequelize-typescript'; // Import for sequelize-typescript

// Define the attributes for the Order model
export interface OrderAttributes {
  id?: number; // Optional 'id' for creation scenarios
  userId: number;
  serviceId: number;
  quantity: number;
  totalPrice: number;
  totalAmount: number;
  orderDetails?: string; // Optional details about the order
  status: string;
}

// Define the Order model with sequelize-typescript decorators
@Table({ tableName: 'orders', timestamps: true }) // Automatically includes createdAt and updatedAt fields
class Order extends Model<OrderAttributes> implements OrderAttributes {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  public userId!: number; // ID of the user placing the order

  @Column({ type: DataType.INTEGER, allowNull: false })
  public serviceId!: number; // ID of the service being ordered

  @Column({ type: DataType.INTEGER, allowNull: false })
  public quantity!: number; // Quantity of the service ordered

  @Column({ type: DataType.FLOAT, allowNull: false })
  public totalPrice!: number; // Total price of the order

  @Column({ type: DataType.FLOAT, allowNull: false })
  public totalAmount!: number; // Total amount (e.g., after tax or discount)

  @Column({ type: DataType.STRING, allowNull: true })
  public orderDetails?: string; // Optional details about the order

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Pending' })
  public status!: string; // Status of the order (default: Pending)
}

// Export the Order model as the default export
export default Order;
