import { Model, DataTypes, Optional, ModelStatic } from 'sequelize';
import { sequelize } from '../config/database'; // Correctly import sequelize instance
import User from './user'; // Import the User model (adjust the path if necessary)

// Define the attributes for the "services" table
interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  user_id: number | null; // Nullable user_id to match the foreign key relation
  createdAt?: Date; // Optional for TypeScript as Sequelize will auto-manage these
  updatedAt?: Date; // Optional for TypeScript as Sequelize will auto-manage these
}

// Define the optional fields for creating instances
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public user_id!: number | null;
  public createdAt?: Date;
  public updatedAt?: Date;

  // Define the associate method to establish relationships
  static associate(models: { User: ModelStatic<Model> }) {
    // Define the association with the User model
    Service.belongsTo(models.User, {
      foreignKey: 'user_id',  // Foreign key is user_id
      onDelete: 'SET NULL',   // Set user_id to NULL if the user is deleted
      onUpdate: 'CASCADE',    // Update user_id if the user's id is updated
    });
  }
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // user_id can be nullable if the user is deleted
      references: {
        model: 'users', // Reference the "users" table
        key: 'id',
      },
      onDelete: 'SET NULL', // Set user_id to NULL if the referenced user is deleted
      onUpdate: 'CASCADE',  // Update user_id if the referenced user's id is updated
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize, // Pass the sequelize instance
    modelName: 'Service', // The name of the model
    tableName: 'services', // The table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt fields
    underscored: true, // Use snake_case for column names
  }
);

// Export the model
export default Service;
