import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Service from './services';

// Define model attributes for TypeScript
interface OrderAttributes {
  id: number;
  userId: number;
  serviceId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  id!: number;
  userId!: number;
  serviceId!: number;
  createdAt!: Date;
  updatedAt!: Date;

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

Order.init(
  {
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
    sequelize,
    modelName: 'Order',
  }
);

export default Order;
