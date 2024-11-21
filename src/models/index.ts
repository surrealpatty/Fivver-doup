import { Sequelize, DataTypes, ModelCtor } from 'sequelize';
import User from './user'; // Assuming the User model is exported as a function
import Service from './services'; // Assuming the Service model is exported as a function
import { Review } from './review'; // Assuming the Review model is exported as a function

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql', // MySQL dialect
  host: 'localhost', // Database host
  database: 'fivver_doup', // Database name
  username: 'root', // Database username
  password: '', // Database password
});

// Define the models using the functions that return model definitions
const models = {
  User: User(sequelize, DataTypes),
  Service: Service(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
};

// Set up associations (if any)
Object.keys(models).forEach((modelName) => {
  const model = models[modelName as keyof typeof models];
  if (model.associate) {
    model.associate(models); // Call the associate method if it exists
  }
});

// Example associations (optional, adapt as per your needs)
models.User.hasMany(models.Service, { foreignKey: 'userId' });
models.Service.belongsTo(models.User, { foreignKey: 'userId' });

models.Service.hasMany(models.Review, { foreignKey: 'serviceId' });
models.Review.belongsTo(models.Service, { foreignKey: 'serviceId' });

models.User.hasMany(models.Review, { foreignKey: 'userId' });
models.Review.belongsTo(models.User, { foreignKey: 'userId' });

// Export sequelize and models with better type inference
export { sequelize, models };

// If you want to define interfaces for your models (optional, but recommended for TypeScript):

// Example User model interface
export interface IUser extends ModelCtor<Model<any, any>> {
  id: number;
  username: string;
  email: string;
  password: string;
}

// Example Service model interface
export interface IService extends ModelCtor<Model<any, any>> {
  id: number;
  title: string;
  description: string;
  userId: number;
}

// Example Review model interface
export interface IReview extends ModelCtor<Model<any, any>> {
  id: number;
  rating: number;
  comment: string;
  serviceId: number;
  userId: number;
}

// The type for the models object, with associations and interfaces applied
export type Models = typeof models;
