import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';  // Adjust the path if necessary

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,  // Automatically sets the current time when a record is created
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,  // Automatically updates the time when the record is updated
      allowNull: false
    }
  },
  {
    sequelize,  // Pass the Sequelize instance here
    modelName: 'User',
    tableName: 'users',  // Adjust the table name if necessary
    timestamps: true,  // Sequelize will manage createdAt and updatedAt
  }
);

export { User };
