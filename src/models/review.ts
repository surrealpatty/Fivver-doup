import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';

// Define the interface for Review model attributes
export interface ReviewAttributes {
  id: number;
  serviceId: number;
  userId: number;
  rating: number;
  comment?: string | null;  // Make comment optional or null
  createdAt?: Date;  // Include createdAt and updatedAt
  updatedAt?: Date;  // Include createdAt and updatedAt
}

// Define the creation attributes (excluding `id`)
export type ReviewCreationAttributes = Optional<ReviewAttributes, 'id'>;

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public serviceId!: number;
  public userId!: number;
  public rating!: number;
  public comment!: string | null;  // Allow null for comment
  public createdAt!: Date;
  public updatedAt!: Date;

  // You can define instance and class methods here if needed
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
      allowNull: true,  // Allow null for comment
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: true,  // Enable createdAt and updatedAt
    underscored: true, // Use snake_case for column names
  }
);

export default Review;
