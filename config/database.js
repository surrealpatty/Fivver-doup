const { Sequelize } = require('sequelize');
const config = require('./config'); // Adjust the path if necessary

const sequelize = new Sequelize(
    config[process.env.NODE_ENV || 'development'].database,
    config[process.env.NODE_ENV || 'development'].username,
    config[process.env.NODE_ENV || 'development'].password,
    {
        host: config[process.env.NODE_ENV || 'development'].host,
        dialect: config[process.env.NODE_ENV || 'development'].dialect,
    }
);

module.exports = sequelize;
