import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Import the sequelize instance

class User extends Model {
  public id!: string; // UUID field for the user ID
  public email!: string; // Email field
  public password!: string; // Password field
  public username!: string; // Username field
  public tier!: string; // User tier (e.g., free or paid)
  public role!: string; // Role (e.g., user, admin)
  public isVerified!: boolean; // Flag for account verification
  public resetToken!: string | null; // Reset token for password reset functionality
  public resetTokenExpiration!: Date | null; // Expiration date for the reset token
  public createdAt!: Date; // createdAt field
  public updatedAt!: Date; // updatedAt field
}

User.init(
  {
    id: {
      type: DataTypes.UUID, // Use UUID type for the ID
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUID for the ID
      primaryKey: true, // Set the ID as the primary key
      allowNull: false, // Ensure the ID is not null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password cannot be null
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false, // Username cannot be null
    },
    tier: {
      type: DataTypes.STRING,
      allowNull: false, // Tier (free/paid) cannot be null
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // Default role is 'user'
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value for isVerified
      field: 'is_verified', // Map to the snake_case column in the database
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true, // resetToken can be null initially
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true, // resetTokenExpiration can be null initially
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false, // createdAt cannot be null
      defaultValue: DataTypes.NOW, // Set default to current timestamp
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false, // updatedAt cannot be null
      defaultValue: DataTypes.NOW, // Set default to current timestamp
    },
  },
  {
    sequelize, // The sequelize instance
    modelName: 'User', // Model name is 'User'
    tableName: 'Users', // Table name in the database
    timestamps: true, // Automatically add createdAt and updatedAt fields
    underscored: true, // Use snake_case column names in the database
  }
);

export { User };
