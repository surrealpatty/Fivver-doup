import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public username!: string;
  public tier!: string;
  public role!: string;
  public isVerified!: boolean;
  public resetToken!: string | null;  // Add this property
  public resetTokenExpiration!: Date | null;  // Add this property
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
    resetToken: {  // Add resetToken field
      type: DataTypes.STRING,
      allowNull: true,  // Can be null initially
    },
    resetTokenExpiration: {  // Add resetTokenExpiration field
      type: DataTypes.DATE,
      allowNull: true,  // Can be null initially
    }
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export { User };
