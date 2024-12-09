import { sequelize } from '../config/database'; // Named import for sequelize
import { DataTypes, Model, Optional } from 'sequelize';

// Define the attributes interface for the User model
export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
}

// Define the creation attributes interface (where 'id' is optional)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,  // The sequelize instance from config/database.ts
    modelName: 'User',
  }
);

// If you're using Sequelize's `addModels()` method (which is only available in Sequelize v6+),
// Ensure this line is correctly added in the right context
sequelize.models.User = User; // Manually add the User model to sequelize instance

export { User };
