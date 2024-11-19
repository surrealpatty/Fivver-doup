import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database'; // or wherever your sequelize instance is

class Review extends Model {
  public id!: number;
  public serviceId!: number;
  public userId!: number;
  public rating!: number;
  public comment!: string;
}

Review.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'reviews',
});

export { Review };
