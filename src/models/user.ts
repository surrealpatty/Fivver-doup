import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Import the sequelize instance
import { v4 as uuidv4 } from 'uuid'; // Import uuid package for manual UUID generation check

console.log("Generated UUID:", uuidv4()); // Verify UUID generation outside of Sequelize

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
}

User.init(
  {
    id: {
      type: DataTypes.UUID, 
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
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true, // resetToken can be null initially
    },
    resetTokenExpiration: {
      type: DataTypes.DATE,
      allowNull: true, // resetTokenExpiration can be null initially
    }
  },
  {
    sequelize, // The sequelize instance
    modelName: 'User', // Model name is 'User'
    tableName: 'users', // Explicitly specify the table name (optional)
    timestamps: true, // Automatically add timestamps (createdAt, updatedAt)
    underscored: true, // Use snake_case column names
  }
);

export { User };
