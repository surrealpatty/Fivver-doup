import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';
import Review from './review';  // Corrected import


class User extends Model {
  public id!: string;
  public name!: string;
  public email!: string;

  // Define associations in the associate method
  public static associate(models: any) {
    User.hasMany(models.Review, { foreignKey: 'userId' });  // One-to-many relation
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export default User;
