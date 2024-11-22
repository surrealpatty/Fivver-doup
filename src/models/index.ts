import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { defineUser } from './user';  // Corrected to named import
import { defineService } from './services';  // Corrected to named import
import { defineReview } from './review';  // Corrected to named import

// Initialize Sequelize with configuration
const sequelize = new Sequelize({
  dialect: 'mysql',  // MySQL dialect
  host: 'localhost',  // Database host
  database: 'fivver_doup',  // Database name
  username: 'root',  // Database username
  password: '',  // Database password (should be secured)
});

// Define the models using their respective definition functions
const User = defineUser(sequelize, DataTypes);  // Ensure defineUser returns a function that takes sequelize and DataTypes
const Service = defineService(sequelize, DataTypes);  // Ensure defineService returns a function that takes sequelize and DataTypes
const Review = defineReview(sequelize, DataTypes);  // Ensure defineReview returns a function that takes sequelize and DataTypes

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
  id: string;  // UUID for user ID
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
  userId: string;  // UUID for the userId
}

export interface IReview extends Model {
  id: number;
  rating: number;
  comment: string;
  serviceId: number;
  userId: string;  // UUID for the userId
}

// Export a typed Models object for stronger type safety
export type Models = typeof models;

// Updated interface with Optional for "create" purposes
export interface IUserCreationAttributes extends Optional<IUser, 'id'> {}
export interface IServiceCreationAttributes extends Optional<IService, 'id'> {}
export interface IReviewCreationAttributes extends Optional<IReview, 'id'> {}
