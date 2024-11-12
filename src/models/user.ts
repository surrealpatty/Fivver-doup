import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database'; // Adjust path if necessary

// Define the User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.TIMESTAMP,
    defaultValue: DataTypes.NOW,
  },
});

// Sync the model with the database, creating the table if it doesn't exist
User.sync({ alter: true }).then(() => {
  console.log('User table is synced');
}).catch((error) => {
  console.error('Error syncing User model:', error);
});

export default User;
