import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the attributes for the Order model
export interface OrderAttributes {
  id: string;
  serviceId: string;
  status: string;
  quantity: number;  // Ensure 'quantity' is here
  totalPrice: number;
  createdAt: Date;   // Sequelize will manage this automatically
  updatedAt: Date;   // Sequelize will manage this automatically
}

// Define the creation attributes, omitting 'id', 'createdAt', and 'updatedAt'
export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the Order model
class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public serviceId!: string;
  public status!: string;
  public quantity!: number;  // Ensure 'quantity' is declared here
  public totalPrice!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the Order model
Order.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,  // Use UUID for automatic ID generation
    },
    serviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Make sure this is defined
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,  // Sequelize will handle createdAt and updatedAt automatically
  }
);

export default Order;
