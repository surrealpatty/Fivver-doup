import { Model, DataTypes } from 'sequelize';  // Ensure DataTypes is correctly imported
import { sequelize } from '../config/database';  // Ensure the sequelize instance is correct

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

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public serviceId!: number;
  public status!: string;
  public quantity!: number;
  public totalPrice!: number;
}

// Initialize the model with attributes and options
Order.init(
  {
    id: {
      type: DataTypes.INTEGER, // Using DataTypes correctly for Sequelize v6+
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
    sequelize,  // Sequelize instance from the database config
    modelName: 'Order',
    tableName: 'orders',  // Make sure this matches your database table name
    timestamps: true, // Optional: add if your table has createdAt/updatedAt fields
  }
);

export default Order;
