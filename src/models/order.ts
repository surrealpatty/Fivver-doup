import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Service from './services';

// Define the model attributes interface for TypeScript
export interface OrderAttributes {
  id: number;
  userId: number;
  serviceId: number;
  orderDetails: string;  // Added orderDetails property
  status: string;        // Added status property
  createdAt?: Date | null;  // Allow null for auto-generated timestamp
  updatedAt?: Date | null;  // Allow null for auto-generated timestamp
}

// Define the creation attributes interface (excluding `id`)
export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public serviceId!: number;
  public orderDetails!: string;  // Added orderDetails property
  public status!: string;        // Added status property
  public createdAt!: Date | null;
  public updatedAt!: Date | null;

  // Define associations inside the `associate` method
  static associate(models: any) {
    // Each Order belongs to a User (foreign key `userId`)
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    // Each Order belongs to a Service (foreign key `serviceId`)
    Order.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'service',
    });
  }
}

// Initialize the Order model
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
    orderDetails: {
      type: DataTypes.STRING,  // Adjust type based on your needs
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,  // Adjust type based on your needs
      allowNull: false,
    },
  },
  {
    sequelize,  // Reference the sequelize instance
    modelName: 'Order',
    tableName: 'orders',  // Ensure it matches the table name
    timestamps: true,  // Sequelize will automatically handle `createdAt` and `updatedAt`
    underscored: true,  // Use snake_case for column names (e.g., `created_at`)
  }
);

export default Order;
