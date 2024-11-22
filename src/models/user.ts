import { Sequelize, DataTypes, Model } from 'sequelize';
import { IUserCreationAttributes } from './index';  // Import the IUserCreationAttributes interface

export const defineUser = (sequelize: Sequelize, DataTypes: any) => {
  class User extends Model<IUserCreationAttributes> implements IUserCreationAttributes {
    id!: string;  // UUID for user ID
    username!: string;
    email!: string;
    password!: string;
    isPaid!: boolean;
  }

  User.init(
    {
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
