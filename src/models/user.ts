import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';  // Ensure this is correctly pointing to your Sequelize instance
import bcrypt from 'bcryptjs';

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: 'Free' | 'Paid';
  subscriptionStatus: 'Inactive' | 'Active';
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
  role!: 'Free' | 'Paid';
  subscriptionStatus!: 'Inactive' | 'Active';
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;

  static associate(models: any) {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
      onDelete: 'CASCADE',
    });
  }

  static async hashPassword(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM('Free', 'Paid'),
      allowNull: false,
      defaultValue: 'Free',
    },
    subscriptionStatus: {
      type: DataTypes.ENUM('Inactive', 'Active'),
      allowNull: false,
      defaultValue: 'Inactive',
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
    sequelize, // Make sure sequelize is correctly passed here
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

User.beforeCreate(User.hashPassword);
User.beforeUpdate(User.hashPassword);

export default User;
