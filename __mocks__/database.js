// __mocks__/database.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // Use in-memory database for testing
module.exports = { sequelize };
