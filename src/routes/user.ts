import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Ensure you're using the correct sequelize instance

// Define the User attributes interface
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  isPaid: boolean;
  username: string;
  role: string;
}

// Define the creation attributes (optional fields during creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Create the User model by extending Sequelize's Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;         // '!' denotes non-nullable field
  public email!: string;
  public password!: string;
  public isPaid!: boolean;
  public username!: string;
  public role!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the User model with Sequelize
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },
  {
    sequelize, // The Sequelize instance
    tableName: 'users', // The table name in the database
    modelName: 'User', // Model name
  }
);

export default User;
