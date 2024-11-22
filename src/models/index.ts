import { Sequelize, DataTypes, Model } from 'sequelize';
import defineUser from './user'; // Assuming the User model exports a definition function
import defineService from './services'; // Assuming the Service model exports a definition function
import defineReview from './review'; // Assuming the Review model exports a definition function

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql', // MySQL dialect
  host: 'localhost', // Database host
  database: 'fivver_doup', // Database name
  username: 'root', // Database username
  password: '', // Database password
});

// Define the models using their respective definition functions
const User = defineUser(sequelize, DataTypes);
const Service = defineService(sequelize, DataTypes);
const Review = defineReview(sequelize, DataTypes);

// Define relationships explicitly
User.hasMany(Service, { foreignKey: 'userId' });
Service.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(Review, { foreignKey: 'serviceId' });
Review.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

// Export the Sequelize instance and models
const models = {
  User,
  Service,
  Review,
};

export { sequelize, models };

// TypeScript interfaces for type safety
export interface IUser extends Model {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface IService extends Model {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;
}

export interface IReview extends Model {
  id: number;
  rating: number;
  comment: string;
  serviceId: number;
  userId: number;
}

// Export a typed Models object
export type Models = typeof models;
