// Example of `order.ts`
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';
import Service from './services';

class Order extends Model {
  // Define attributes here if necessary
}

Order.init(
  {
    // Define your model attributes here
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

// Define associations (Order to User, Service, etc.)
Order.associate = (models: any) => {
  Order.belongsTo(models.User, {
    foreignKey: 'userId', // Make sure the field exists
    as: 'user',
  });
  Order.belongsTo(models.Service, {
    foreignKey: 'serviceId', // Make sure the field exists
    as: 'service',
  });
};

export default Order;
