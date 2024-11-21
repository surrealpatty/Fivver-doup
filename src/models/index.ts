import { Model, Sequelize, DataTypes } from 'sequelize'; // Import Model from Sequelize

// Define a model interface with the optional 'associate' method
interface ModelWithAssociations extends Model {
  associate?: (models: Record<string, typeof Model>) => void; // Correct typing for associate method
}

// Export the interface if necessary
export { ModelWithAssociations };
