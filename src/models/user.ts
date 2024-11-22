import { Sequelize, DataTypes, Model } from 'sequelize';
import { IUserAttributes, IUserCreationAttributes } from '../types';

const defineUser = (sequelize: Sequelize) => {
  class User extends Model<IUserAttributes, IUserCreationAttributes> implements IUserAttributes {
    id!: string;
    username!: string;
    email!: string;
    password!: string;
    isPaid!: boolean;
  }

  User.init(
    {
      id: { 
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
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
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};

export default defineUser;  // Default export
