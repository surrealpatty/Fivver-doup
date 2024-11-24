import { sequelize } from '../config/database'; // Import the sequelize instance
import User from './user'; // Default import for User model
import Service from './service'; // Default import for Service model
import Order from './order'; // Default import for Order model
import Review from './review'; // Default import for Review model
import { ModelStatic } from 'sequelize'; // Import ModelStatic from Sequelize for model class typing

// Define associations between models
(User as ModelStatic<any>).hasMany(Service, { foreignKey: 'userId' });
(Service as ModelStatic<any>).belongsTo(User, { foreignKey: 'userId' });

(Service as ModelStatic<any>).hasMany(Order, { foreignKey: 'serviceId' });
(Order as ModelStatic<any>).belongsTo(Service, { foreignKey: 'serviceId' });

(Service as ModelStatic<any>).hasMany(Review, { foreignKey: 'serviceId' });
(Review as ModelStatic<any>).belongsTo(Service, { foreignKey: 'serviceId' });

// Add models to Sequelize instance
sequelize.addModels([User, Service, Order, Review]);

// Export models for use elsewhere
export { User, Service, Order, Review };
