// src/models/services.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '@config/database';  // Ensure correct import of the sequelize instance

// Define the attributes for the Service model
interface ServiceAttributes {
  id: number;
  userId: number;
  title: string;
  description: string;
  price: number;
  name: string;  // Add name property
  imageUrl?: string;  // New field for image URL (optional)
}

// Define the creation attributes (without `id` as it's auto-generated by Sequelize)
interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public name!: string;
  public imageUrl?: string;  // New field for image URL (optional)

  // You can add additional instance methods here if needed
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,   // Auto-increment ID
      allowNull: false,      // ID cannot be null
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,      // userId cannot be null
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,      // title cannot be null
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,      // description cannot be null
    },
    price: {
      type: DataTypes.FLOAT, 
      allowNull: false,      // price cannot be null
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,      // name cannot be null
    },
    imageUrl: {
      type: DataTypes.STRING,  // Optional string field for image URL
      allowNull: true,         // Image URL is optional
    },
  },
  {
    sequelize,               // Pass the sequelize instance
    modelName: 'Service',    // Model name
    tableName: 'services',   // Ensure the table name matches
    timestamps: true,        // Enable automatic timestamps (createdAt, updatedAt)
  }
);

export default Service;
export { ServiceCreationAttributes };
