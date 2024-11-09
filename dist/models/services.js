// src/models/services.js
"use strict";
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust the path to your database config

class Service extends Model {}

Service.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Assuming you have a User model with which services are associated
        key: 'id',
      },
    },
  },
  {
    sequelize, // Sequelize instance
    modelName: 'Service',
    tableName: 'services', // Ensure your table is named 'services'
    timestamps: true, // You can adjust this based on your table schema
  }
);

// Export the Service model
module.exports = { Service };
