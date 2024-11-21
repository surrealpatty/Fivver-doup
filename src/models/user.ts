import { DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database';  // Named import
import Service from './services';  // Import associated models

// Define the User model interface
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string; // Add password to UserAttributes interface
  isPaid: boolean;  // Add isPaid to UserAttributes
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the User creation attributes interface (without id)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string; // Add password field
  public isPaid!: boolean;  // Add isPaid field

  // Readonly timestamps provided by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations type for TypeScript
  public static associations: {
    services: Association<User, Service>;
  };

  // Static method to define associations
  public static associate(models: { Service: typeof Service }) {
    // User can have many services
    User.hasMany(models.Service, {
      foreignKey: 'userId',  // Adjust based on your schema
      as: 'services',        // Alias for the relationship
    });
  }

  // You can add instance methods or virtuals here if needed
}

// Initialize the User model with the sequelize instance
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,  // Add the password field to the model
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN, // Define isPaid as a boolean
      defaultValue: false,     // Set default value to false
    },
  },
  {
    sequelize,        // Sequelize instance
    modelName: 'User', // Model name
    tableName: 'users', // Table name in DB
    underscored: true,  // Use snake_case for column names
    timestamps: true,   // Sequelize handles timestamps automatically
  }
);

export default User;  // Default export as per the import style in index.ts
