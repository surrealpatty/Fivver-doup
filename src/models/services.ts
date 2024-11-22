import { Model, DataTypes, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database';  // Named import for sequelize instance
import User from './user';  // Import the associated User model

// Define the attributes for the Service model
interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;  // Added category as part of the model
  userId: string;  // UUID type for User ID
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes required for creating a Service (exclude id)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public price!: number;
  public category!: string;  // Category added here
  public userId!: string;  // UUID type for User ID

  // Readonly timestamps provided by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations type for TypeScript
  public static associations: {
    user: Association<Service, User>;
  };

  // Static method to define associations
  public static associate(models: { User: typeof User }) {
    // A service belongs to a user
    Service.belongsTo(models.User, {
      foreignKey: 'userId',  // Foreign key in the services table
      as: 'user',            // Alias for the relationship
    });
  }
}

// Initialize the Service model with the sequelize instance
Service.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {  // Added category field
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,  // UUID for User ID
      allowNull: false,
      references: {
        model: 'users',  // Reference to the User table
        key: 'id',
      },
      onDelete: 'CASCADE',  // Ensures cascading deletes when a user is deleted
    },
  },
  {
    sequelize,           // Sequelize instance
    modelName: 'Service', // Model name
    tableName: 'services', // Table name
    timestamps: true,     // Sequelize will handle createdAt and updatedAt
    underscored: true,    // Use snake_case for column names in the DB
  }
);

export default Service;
