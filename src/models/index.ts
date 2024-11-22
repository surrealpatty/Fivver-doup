import { Sequelize, DataTypes, Model } from 'sequelize';
import defineUser from './user';  // Import User model definition
import defineService from './services';  // Import Service model definition
import defineReview from './review';  // Import Review model definition

// Initialize Sequelize with configuration
const sequelize = new Sequelize({
  dialect: 'mysql',  // MySQL dialect
  host: 'localhost',  // Database host
  database: 'fivver_doup',  // Database name
  username: 'root',  // Database username
  password: '',  // Database password (should be secured)
});

// Define the models using their respective definition functions
const User = defineUser(sequelize, DataTypes);  // User model definition
const Service = defineService(sequelize, DataTypes);  // Service model definition
const Review = defineReview(sequelize, DataTypes);  // Review model definition

// Define associations (relationships) between models
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });  // One User can have many Services
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });  // A Service belongs to a User

Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });  // One Service can have many Reviews
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });  // A Review belongs to a Service

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });  // One User can have many Reviews
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });  // A Review belongs to a User

// Export the Sequelize instance and the models as part of a 'models' object
const models = {
  User,
  Service,
  Review,
};

// Export the sequelize instance and models for use elsewhere in the application
export { sequelize, models };

// TypeScript interfaces for type safety (for use in other files)
export interface IUser extends Model {
  id: string;  // UUID for user ID (updated for UUID type)
  username: string;
  email: string;
  password: string;
  isPaid: boolean;
}

export interface IService extends Model {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: string;  // Updated to string to match UUID type
}

export interface IReview extends Model {
  id: number;
  rating: number;
  comment: string;
  serviceId: number;
  userId: string;  // Updated to string to match UUID type
}

// Export a typed Models object for stronger type safety
export type Models = typeof models;
