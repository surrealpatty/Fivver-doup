import { Sequelize, Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Import your sequelize instance

// Define a model interface with the optional 'associate' method
interface ModelWithAssociations extends Model {
  associate?: (models: Record<string, typeof Model>) => void; // Correct typing for associate method
}

// Initialize an empty object to hold all models
const models: Record<string, ModelWithAssociations> = {};

// Dynamically import all models
import(path.resolve(__dirname, './user'));
import(path.resolve(__dirname, './services'));

// Loop over models to set up associations
Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

// Export models
export { models };

// Example of how you might use the models elsewhere in the app
// export default models;
