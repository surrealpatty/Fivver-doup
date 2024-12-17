import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Correctly import the sequelize instance

// Define the attributes for the Service model
export interface ServiceAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  userId: string;
  image?: string | null;  // Allow 'null' for the image field
}

// Define the creation attributes for the Service model (excluding 'id')
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
  // 'id' is optional during creation since it's auto-generated
}

// Define the Service model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public userId!: string;
  public image?: string | null;  // Allow 'null' for image field

  // Add other model methods if necessary
}

// Initialize the Service model with the sequelize instance
Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // Mark as the primary key
      autoIncrement: true,  // Automatically increment the value
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Name must be provided
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,  // Description must be provided
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,  // Price must be provided
    },
    userId: {
      type: DataTypes.STRING,  // This should match the type of your userId field (you can change this to `INTEGER` if necessary)
      allowNull: false,  // User ID must be provided
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,  // Allow null for the image field
    },
  },
  {
    sequelize,  // Pass the sequelize instance here
    modelName: 'Service',  // Model name to be used in database
    tableName: 'services',  // Optionally specify table name (default is the plural form of model name)
    timestamps: true,  // Enable timestamps (createdAt, updatedAt)
    freezeTableName: true,  // Prevent Sequelize from pluralizing the table name
  }
);

// Export the Service model as a default export
export default Service;
