import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure sequelize is correctly imported

// Define the attributes interface for the Order model
interface OrderAttributes {
  orderId: number;
  userId: number;
  serviceId: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Order model class
class Order extends Model<OrderAttributes> implements OrderAttributes {
  public orderId!: number;
  public userId!: number;
  public serviceId!: number;
  public status!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define the associations (belongsTo associations)
  static associate(models: any) {
    // Order belongs to User (via userId)
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

    // Order belongs to Service (via serviceId)
    Order.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  }
}

// Initialize the Order model
Order.init(
  {
    orderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize, // Pass the sequelize instance here
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true, // Automatically add createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names in the database (optional)
  }
);

export default Order;
