// src/models/order.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import Service from './service';
import User from './user';

class Order extends Model {
  public id!: number;
  public serviceId!: number;
  public userId!: number;
  public status!: string;
  public totalAmount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate() {
    Order.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
    Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  }
}

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
        model: 'services', // Assuming the table name for the Service model is 'services'
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Assuming the table name for the User model is 'users'
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
