import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Service from './services';

// Define model attributes for TypeScript
interface OrderAttributes {
  id: number;
  userId: number;
  serviceId: number;
  createdAt: Date | null;  // Allowing null for auto-generated timestamp
  updatedAt: Date | null;  // Allowing null for auto-generated timestamp
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public createdAt!: Date | null;
  public updatedAt!: Date | null;

  // Define associations inside the `associate` method
  static associate(models: any) {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    Order.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'service',
    });
  }
}

// Initialize the model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,  // Auto increment the id
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,  // Reference to Sequelize instance
    modelName: 'Order',
    tableName: 'orders',  // Ensure it matches the table name
    timestamps: true,  // Enable automatic timestamps (createdAt, updatedAt)
    createdAt: 'createdAt',  // Explicitly define custom timestamps if necessary
    updatedAt: 'updatedAt',
  }
);

export default Order;
