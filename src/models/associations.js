import User from './user';
import Service from './services';
import Order from './order';
User.hasMany(Service, { foreignKey: 'userId' });
Service.belongsTo(User, { foreignKey: 'userId' });
Service.hasMany(Order, { foreignKey: 'serviceId' });
Order.belongsTo(Service, { foreignKey: 'serviceId' });
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });
