import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Adjust the path if necessary

class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public username!: string;
  public tier!: string;
  public role!: string;
  public isVerified!: boolean;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generate a UUID
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // Default value for role
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value for isVerified
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };  // Ensure this is at the end of the file
