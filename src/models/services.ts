import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Import the sequelize instance

// Define the interface for the attributes used to create a Service (without the primary key)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {
  name: string;
  description: string;
  price: number;
  image?: string;
  userId: string;  // Ensure userId type matches the User model
}

// Define the interface for the attributes of a Service (including the primary key)
export interface ServiceAttributes {
  id: string;  // Ensure id is a string to align with the User model's id type
  userId: string;  // Ensure userId is a string to match the User model's id
  name: string;
  description: string;
  price: number;
  image?: string;
}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: string;  // Ensuring id is a string
  public userId!: string;  // Ensuring userId is a string
  public name!: string;
  public description!: string;
  public price!: number;
  public image?: string;  // Optional image field
}

Service.init(
  {
    id: {
      type: DataTypes.STRING,  // Using string type to align with UUID format
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,  // Use UUIDv4 for auto-generated ids
    },
    userId: {
      type: DataTypes.STRING,  // Ensure userId type is a string to match the User model's id type
      allowNull: false,
      references: {
        model: 'Users',  // Foreign key reference to the Users table
        key: 'id',  // Linking to the 'id' column of the Users table
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure the service name is required
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure the service description is required
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,  // Ensure the service price is required
    },
    image: {
      type: DataTypes.STRING,  // Optional field for the service image
      allowNull: true,  // Allow image to be null (if not provided)
    },
  },
  {
    sequelize,  // The sequelize instance
    modelName: 'Service',  // Model name 'Service'
    tableName: 'Services',  // Table name in the database
    timestamps: true,  // Automatically adds `createdAt` and `updatedAt` fields
    underscored: true,  // Use snake_case column names in the database
  }
);

export default Service;
