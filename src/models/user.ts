import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '@config/database';  // Named import for sequelize
import bcrypt from 'bcrypt';  // Import bcrypt for password hashing

// Define the attributes of the User model
export interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: 'free' | 'paid'; // Role can be 'free' or 'paid'
  isPaid: boolean; // Add the isPaid field as required
  createdAt?: Date; // Optional because Sequelize manages timestamps
  updatedAt?: Date; // Optional because Sequelize manages timestamps
}

// Define the attributes required for creating a new User
export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Define the User model class
class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role?: 'free' | 'paid'; // Role field can be free or paid
  public isPaid!: boolean; // Add isPaid field as required

  // These fields are automatically managed by Sequelize, hence read-only
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Method to compare passwords (useful for authentication)
  public comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password); // Synchronous password comparison
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('free', 'paid'), // Define role options as ENUM
      defaultValue: 'free', // Default to 'free' if not provided
      allowNull: false, // Role must be specified
    },
    isPaid: {
      type: DataTypes.BOOLEAN, // Define isPaid as a boolean
      defaultValue: false, // Default to false if not provided
      allowNull: false, // isPaid must be specified
    },
  },
  {
    sequelize, // Sequelize instance passed here
    modelName: 'User', // Model name
    tableName: 'users', // Table name in the database
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Hash the password before saving the user to the database
User.beforeCreate(async (user) => {
  if (user.password) {
    // Hash the password with bcrypt before saving
    const saltRounds = 10; // Number of salt rounds, can be adjusted
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

// Export the User model for use in other files
export { User };
