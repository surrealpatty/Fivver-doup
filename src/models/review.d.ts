import { DataTypes, Model, Optional, Association } from 'sequelize';
import { sequelize } from '../config/database';  // Named import for Sequelize instance
import User from './user';  // Import the associated User model
import Service from './services';  // Import the associated Service model

// Define the attributes for the Review model
export interface ReviewAttributes {
  id: number;
  userId: string;  // UUID type for userId
  serviceId: number;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the attributes required for creating a Review (exclude id)
export type ReviewCreationAttributes = Optional<ReviewAttributes, 'id'>;

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public userId!: string;  // UUID for userId
  public serviceId!: number;
  public rating!: number;
  public comment!: string;

  // Readonly timestamps provided by Sequelize
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations between models (use static method)
  public static associations: {
    user: Association<Review, User>;
    service: Association<Review, Service>;
  };

  // Static method to define associations between models
  static associate(models: { User: typeof User; Service: typeof Service }) {
    // A review belongs to a user (one-to-many)
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

    // A review belongs to a service (one-to-many)
    Review.belongsTo(models.Service, { foreignKey: 'serviceId', as: 'service' });
  }
}

// Initialize the Review model
Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,  // UUID to match the User model
      allowNull: false,
      references: {
        model: 'users',  // Reference to 'users' table
        key: 'id',
      },
      onDelete: 'CASCADE',  // Cascade delete if a user is deleted
    },
    serviceId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'services',  // Reference to 'services' table
        key: 'id',
      },
      onDelete: 'CASCADE',  // Cascade delete if a service is deleted
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,  // Rating must be between 1 and 5
        max: 5,
      },
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,  // Pass the sequelize instance to the model
    modelName: 'Review',
    tableName: 'reviews',  // Ensure the table name is correct
    timestamps: true,  // Sequelize will automatically manage createdAt and updatedAt fields
    underscored: true,  // Use snake_case for column names (if needed)
  }
);

export { Review };
