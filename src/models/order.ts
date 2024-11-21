import { DataTypes, Model, Optional } from 'sequelize';
import  sequelize  from '../config/database'; // Named import for sequelize instance
import User from './user'; // Import User model
import Service from './services'; // Import Service model

// Define the Order attributes interface
export interface OrderAttributes {
  id: number;
  userId: string | null; // UUID type for userId
  serviceId: number | null; // INTEGER for serviceId
  orderDetails: string;
  quantity: number; // Quantity of the service ordered
  totalAmount: number; // Total amount for the order
  status: 'Pending' | 'Completed' | 'Cancelled'; // Enum for order status
  createdAt?: Date | null; // Auto-managed by Sequelize
  updatedAt?: Date | null; // Auto-managed by Sequelize
}

// Define creation attributes (id is excluded because it's auto-incremented)
export type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

// Define the Order model class
class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: string | null;
  public serviceId!: number | null;
  public orderDetails!: string;
  public quantity!: number;
  public totalAmount!: number;
  public status!: 'Pending' | 'Completed' | 'Cancelled';

  // Timestamps are read-only and managed by Sequelize
  public readonly createdAt!: Date | null;
  public readonly updatedAt!: Date | null;

  // Define model associations
  static associate(models: { User: typeof User; Service: typeof Service }) {
    // Associate Order with User
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // Associate Order with Service
    Order.belongsTo(models.Service, {
      foreignKey: 'serviceId',
      as: 'service',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  }
}

// Initialize the Order model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.UUID, // UUID for userId
      allowNull: true, // Supports ON DELETE SET NULL
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    serviceId: {
      type: DataTypes.INTEGER, // Integer for serviceId
      allowNull: true, // Supports ON DELETE SET NULL
      references: {
        model: Service,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    orderDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2), // Decimal with precision and scale
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending', // Default status
    },
  },
  {
    sequelize, // Sequelize instance
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true, // Enable createdAt and updatedAt
    underscored: true, // Use snake_case for column names
  }
);

export default Order;
