import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Import sequelize instance
import Service from './service'; // Import Service model for associations
import User from './user'; // Import User model for associations

// Define the attributes interface for the Order model
interface OrderAttributes {
  id: number;
  serviceId: number;
  userId: number;
  status: string;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Order model class
class Order extends Model<OrderAttributes> implements OrderAttributes {
  public id!: number;
  public serviceId!: number;
  public userId!: number;
  public status!: string;
  public totalAmount!: number;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations for Order
  static associate(models: any) {
    // An order belongs to one service
    Order.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });

    // An order belongs to one user (the buyer)
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

// Initialize the Order model
Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Status cannot be empty',
        },
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: {
          msg: 'Total amount must be a valid number',
        },
        min: {
          args: [0],
          msg: 'Total amount must be greater than or equal to zero',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
    underscored: true,
  }
);

export default Order;
