import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database'; // Ensure the path matches your project structure
import Review from './review'; // Import related model for association

// Define User model attributes
interface UserAttributes {
  id: string;
  name: string;
  email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// User model definition
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public name!: string;
  public email!: string;

  // Timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Static method for defining associations
  public static associate(models: { [key: string]: typeof Model }) {
    User.hasMany(models.Review, { foreignKey: 'userId', as: 'reviews', onDelete: 'CASCADE' });
  }
}

// Initialize User model
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generates UUID
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures name is not empty
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensures email uniqueness
      validate: {
        isEmail: true, // Validates email format
      },
    },
  },
  {
    sequelize, // Sequelize instance
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
    timestamps: true, // Enables createdAt and updatedAt fields
    underscored: true, // Converts camelCase to snake_case
  }
);

export default User;
