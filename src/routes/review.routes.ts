import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Correct import of sequelize instance

export class Review extends Model {
  public reviewedUserId!: number;
  public rating!: number;
  public comment!: string;
  public userId!: string;
}

Review.init(
  {
    reviewedUserId: {
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
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Review',
  }
);
