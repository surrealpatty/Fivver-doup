// src/models/review.ts
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

class Review extends Model {
  public id!: number;
  public serviceId!: number;
  public userId!: number;
  public rating!: number;
  public comment!: string;
}

Review.init(
  {
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
  },
  {
    sequelize, // Important! Ensure the sequelize instance is passed in here
    tableName: 'reviews', // Name of the table
  }
);

export default Review;
