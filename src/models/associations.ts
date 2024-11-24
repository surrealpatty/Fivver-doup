import { sequelize } from '../config/database';
import User from './user';
import Service from './service';
import Order from './order';
import Review from './review';

// Associations
User.hasMany(Service, { foreignKey: 'userId' });
Service.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Order, { foreignKey: 'serviceId' });
Order.belongsTo(Service, { foreignKey: 'serviceId' });

Service.hasMany(Review, { foreignKey: 'serviceId' });
Review.belongsTo(Service, { foreignKey: 'serviceId' });

// Add models to Sequelize instance
sequelize.addModels([User, Service, Order, Review]);  // Ensure this correctly adds the models
