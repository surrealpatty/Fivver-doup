import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Correct path to your sequelize instance
import { v4 as uuidv4 } from 'uuid';

// Define the attributes of the User model
interface UserAttributes {
  id: string;
  email: string;
  password: string;
  username: string;
  role: string;
  firstName: string;
  lastName: string;
  subscriptionStatus: string;
  subscriptionStartDate: Date | null;
  subscriptionEndDate: Date | null;
}

// Define the creation attributes (optional fields that can be omitted in creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public username!: string;
  public role!: string;
  public firstName!: string;
  public lastName!: string;
  public subscriptionStatus!: string;
  public subscriptionStartDate!: Date | null;
  public subscriptionEndDate!: Date | null;

  // Optional: if you want to control timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4, // Ensure uuidv4 is correctly used as a function
      primaryKey: true,
      allowNull: false,
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: true, // This can be null if not provided
      defaultValue: 'Inactive', // Default value if not specified
    },
    subscriptionStartDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    subscriptionEndDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true, // Sequelize will manage createdAt and updatedAt automatically
  }
);

export default User;
