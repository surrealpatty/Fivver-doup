// src/models/order.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this is correct after transpiling

const Order = sequelize.define('Order', {
  // Define the attributes of the order model
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

module.exports = Order;
