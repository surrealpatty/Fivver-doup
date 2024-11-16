import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; // Import the Sequelize instance

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public role!: string;
  public subscriptionStatus!: string;
  public subscriptionEndDate?: Date;
public subscriptionStartDate?: Date;

}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'Free',
    },
    subscriptionStatus: {
      type: DataTypes.STRING,
      defaultValue: 'Inactive',
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User; // Using default export
