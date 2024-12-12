import { DataTypes, Sequelize, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Assuming sequelize is exported from this path

// Define the shape of the User model
interface UserAttributes {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

// Optional type for creating a new user (without `id` field)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      defaultValue: sequelize.literal('UUID()'),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),  // Using `sequelize.fn` to set the current timestamp
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW'),  // Default to current timestamp
    },
  },
  {
    tableName: 'Users',
    sequelize, // passing the sequelize instance
    timestamps: true, // Enable automatic management of `created_at` and `updated_at`
    updatedAt: 'updated_at',  // Specify that the `updated_at` field should be used for auto-updates
    createdAt: 'created_at',  // Specify the `created_at` field
  }
);

export default User;
