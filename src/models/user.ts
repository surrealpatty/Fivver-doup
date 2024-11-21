import { DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure this path is correct
import Service from './services'; // Import associated models

// Define the User model interface
interface UserAttributes {
  id: number;
  username: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;

  // Add other fields as necessary

  // Define associations
  public static associations: {
    services: Association<User, Service>;
  };

  // Define any instance methods or virtuals here if needed
}

// Initialize the User model with the sequelize instance
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
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
    // Add other fields as necessary
  },
  {
    sequelize,        // Sequelize instance
    modelName: 'User', // Model name
    tableName: 'users', // Table name in DB
  }
);

// Define the static associate method
User.associate = (models: any) => {
  // Example association: User can have many services
  User.hasMany(models.Service, {
    foreignKey: 'userId',  // Adjust based on your schema
    as: 'services',        // Alias for the relationship
  });
  // Add other associations here if needed
};

export default User;  // Default export as per the import style in index.ts
