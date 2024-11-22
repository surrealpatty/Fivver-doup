import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/database';  // Ensure this points to your Sequelize instance

// Define the Review model interface for type safety
export interface IReview {
  id: number;
  serviceId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Review model class
export class Review extends Model<IReview> implements IReview {
  public id!: number;
  public serviceId!: string;
  public userId!: string;
  public rating!: number;
  public comment!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

// Initialize the Review model
Review.init(
  {
    serviceId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
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
    sequelize,  // Pass the sequelize instance
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: true,  // Sequelize will automatically handle createdAt and updatedAt
  }
);

// Export the Review model for use elsewhere
export default Review;
