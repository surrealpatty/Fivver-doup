import { Sequelize } from 'sequelize';
import defineUser from './user';  // Default import, assuming it's exported as a default function
import defineService from './services';  // Default import, assuming it's exported as a default function
import defineReview from './review';  // Default import, assuming it's exported as a default function

// Initialize Sequelize instance
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  database: 'fivver_doup',
  username: 'root',
  password: '',
});

// Define models using the factory functions (pass only `sequelize`)
const User = defineUser(sequelize); // Define the User model
const Service = defineService(sequelize); // Define the Service model
const Review = defineReview(sequelize); // Define the Review model

// Define relationships (associations) between models
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Export models and sequelize instance
export { sequelize, User, Service, Review };
