import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database'; // Path to your sequelize instance
import { User } from './user'; // Assuming the User model is in src/models/user.ts
import { Service } from './service'; // Assuming the Service model is in src/models/service.ts

// Define the attributes of the Review model
interface ReviewAttributes {
  id: number;
  userId: string; // Assuming the user is referenced by UUID
  serviceId: number; // Assuming the service is referenced by its numeric ID
  rating: number; // A numeric rating (e.g., 1-5 stars)
  comment: string; // Review comment
  createdAt: Date;
  updatedAt: Date;
}

// Define the creation attributes (optional fields that can be omitted in creation)
interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id'> {}

class Review extends Model<ReviewAttributes, ReviewCreationAttributes> implements ReviewAttributes {
  public id!: number;
  public userId!: string;
  public serviceId!: number;
  public rating!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Define associations (optional)
  public static associate: (models: { User: typeof User; Service: typeof Service }) => void;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users', // Reference to the users table
        key: 'id', // Foreign key to the user's id
      },
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'services', // Reference to the services table
        key: 'id', // Foreign key to the service's id
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews', // Ensure the table name matches your DB
    timestamps: true,
  }
);

// Define associations (optional, but recommended for Sequelize's automatic association handling)
Review.associate = (models) => {
  Review.belongsTo(models.User, { foreignKey: 'userId' });
  Review.belongsTo(models.Service, { foreignKey: 'serviceId' });
};

export { Review, ReviewAttributes, ReviewCreationAttributes };
