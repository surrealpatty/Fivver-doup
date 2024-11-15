import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './user';  // Import the User model for association

// Define the ServiceAttributes interface
export interface ServiceAttributes {
  id?: number;  // Optional, as Sequelize will auto-generate the ID
  name: string;
  description: string;
  userId: number;  // Foreign key referencing User
  createdAt?: Date | null;  // Allowing null for createdAt as it's auto-generated
  updatedAt?: Date | null;  // Allowing null for updatedAt as it's auto-generated
}

// Define the ServiceCreationAttributes interface (used for creation without the ID)
export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

// Define the Service model class
class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public userId!: number;  // Foreign key to User
  public createdAt!: Date | null;
  public updatedAt!: Date | null;

  // Define associations here
  static associate(models: any) {
    // Each service belongs to one user
    Service.belongsTo(models.User, {
      foreignKey: 'userId',   // Foreign key in the services table
      as: 'user',             // Alias to access the associated user model in queries
      onDelete: 'SET NULL',   // If the associated user is deleted, set the userId to null
      onUpdate: 'CASCADE',    // If the user's id is updated, update the foreign key as well
    });
  }
}

// Initialize the model
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Ensure each service has a user associated with it
      references: {
        model: User,   // Directly reference the User model for the foreign key
        key: 'id',     // The key in the User model to reference
      },
      onDelete: 'SET NULL',   // If the associated user is deleted, set the userId to null
      onUpdate: 'CASCADE',    // If the user's id is updated, update this foreign key as well
    },
  },
  {
    sequelize,              // Pass the sequelize instance
    modelName: 'Service',   // Model name as 'Service'
    tableName: 'services',  // Specify the table name for services
    timestamps: true,       // Sequelize will handle createdAt and updatedAt automatically
    underscored: true,      // Use snake_case for column names (e.g., created_at, updated_at)
  }
);

export default Service;
