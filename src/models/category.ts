import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust the path as necessary

// Define the Category model
class Category extends Model {
  public id!: number;  // Primary key
  public name!: string;  // Name of the category
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensures the name field is required
      unique: true,  // Makes category names unique
    },
  },
  {
    sequelize,  // Pass in the sequelize instance
    modelName: 'Category',
    tableName: 'categories',  // Optional: If you want to specify a custom table name
    timestamps: true,  // Automatically adds createdAt and updatedAt columns
  }
);

export default Category;
