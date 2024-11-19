import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database'; // Ensure the import matches your file structure
import User from './user'; // Import the User model for associations
import Service from './service'; // Import the Service model for associations

// Define the attributes for the Order model
interface OrderAttributes {
  id: number;
  userId: string | null; // UUID type for userId
  serviceId: number | null; // Allow null if the service is deleted
  orderDetails: string;
  status: 'Pending' | 'Completed' | 'Cancelled'; // ENUM for order status
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the creation attributes (all fields except `id` are optional)
type OrderCreationAttributes = Optional<OrderAttributes, 'id'>;

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: string | null;
  public serviceId!: number | null;
  public orderDetails!: string;
  public status!: 'Pending' | 'Completed' | 'Cancelled';

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations
  static associate(models: { User: typeof User; Service: typeof Service }) {
    // An Order belongs to a User
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // An Order belongs to a Service
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
      type: DataTypes.UUID,
      allowNull: true, // Allow null if the user is deleted
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null if the service is deleted
      references: {
        model: Service,
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
    orderDetails: {
      type: DataTypes.STRING, // Adjust type if order details need a different format
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Completed', 'Cancelled'),
      allowNull: false,
      defaultValue: 'Pending',
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
    underscored: true, // Converts camelCase to snake_case for database columns
  }
);

export default Order;
