import { Column, Model, Table } from 'sequelize-typescript';  // Use sequelize-typescript decorators
import { sequelize } from '../config/database';  // Sequelize instance as usual

// Define Order attributes interface
interface OrderAttributes {
  id: number;
  serviceId: number;
  status: string;
  quantity: number;
  totalPrice: number;
}

// Optional attributes for creation (id can be omitted on creation)
export interface OrderCreationAttributes extends Omit<OrderAttributes, 'id'> {}

@Table({ tableName: 'orders' })
class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  @Column({ primaryKey: true, autoIncrement: true })
  public id!: number;

  @Column
  public serviceId!: number;

  @Column
  public status!: string;

  @Column
  public quantity!: number;

  @Column
  public totalPrice!: number;
}

export default Order;
