// __mocks__/database.js
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:'); // In-memory SQLite DB for testing
module.exports = { sequelize };

