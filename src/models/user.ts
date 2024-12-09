import { sequelize } from '../config/database'; // Named import for sequelize
import { DataTypes, Model, Optional } from 'sequelize';

// Define the attributes interface for the User model
export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string;
  role: string;  // Add role
  tier: string;  // Add tier
}

// Define the creation attributes interface (where 'id' is optional)
export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public username!: string;
  public password!: string;
  public role!: string;  // Define role
  public tier!: string;  // Define tier
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
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'free',  // You can set a default role
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'free',  // You can set a default tier
    }
  },
  {
    sequelize,  // The sequelize instance from config/database.ts
    modelName: 'User',
  }
);

sequelize.models.User = User; // Add the User model to sequelize instance

export { User };
