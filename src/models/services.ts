import { Model, DataTypes, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database'; // Use named import for sequelize
import User from './user';  // Import the associated User model

// Define the attributes for the Service model
interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  price: number;
  userId: number;
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
  public userId!: number;

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
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',  // Ensure it matches the User table name
        key: 'id',
      },
      onDelete: 'CASCADE',  // Ensures cascading deletes when a user is deleted
    },
  },
  {
    sequelize,          // Sequelize instance
    modelName: 'Service', // Model name
    tableName: 'services', // Table name in the DB
    timestamps: true,     // Sequelize will handle createdAt and updatedAt
    underscored: true,    // Use snake_case for column names in the DB
  }
);

// Export default for easy imports
export default Service; 
