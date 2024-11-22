import { Sequelize, DataTypes, ModelCtor, Model } from 'sequelize';
import User from './user'; // Assuming the User model is exported as a function
import Service from './services'; // Assuming the Service model is exported as a function
import { Review } from './review';  // Use named imports

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql', // MySQL dialect
  host: 'localhost', // Database host
  database: 'fivver_doup', // Database name
  username: 'root', // Database username
  password: '', // Database password
});

// Define the models using their respective functions
const models = {
  User: User(sequelize, DataTypes),
  Service: Service(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
};

// Set up associations (if they exist)
Object.keys(models).forEach((modelName) => {
  const model = models[modelName as keyof typeof models];
  if (typeof model.associate === 'function') {
    model.associate(models); // Call the associate method if it exists
  }
});

// Define relationships explicitly if not defined in `associate` methods
models.User.hasMany(models.Service, { foreignKey: 'userId' });
models.Service.belongsTo(models.User, { foreignKey: 'userId' });

models.Service.hasMany(models.Review, { foreignKey: 'serviceId' });
models.Review.belongsTo(models.Service, { foreignKey: 'serviceId' });

models.User.hasMany(models.Review, { foreignKey: 'userId' });
models.Review.belongsTo(models.User, { foreignKey: 'userId' });

// Export the Sequelize instance and models
export { sequelize, models };

// Define interfaces for models for TypeScript type safety

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
