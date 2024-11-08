// src/models/order.js
import { DataTypes } from 'sequelize';  // Use ES module import syntax
import sequelize from '../config/database.js';  // Correct path to the sequelize instance

// Define the Order model
const Order = sequelize.define('Order', {
  order_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  // Add more fields as needed
});

// Export the Order model
export default Order;
