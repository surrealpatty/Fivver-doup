"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// Set up Sequelize instance with the correct connection string
const sequelize = new sequelize_1.Sequelize('mysql://your_username:your_password@localhost:3306/your_database_name', {
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4', // Ensure compatibility with utf8mb4
    },
    logging: false, // Optionally disable logging for better performance
});
exports.sequelize = sequelize;
// Configuration for different environments
exports.config = {
    development: {
        username: 'your_username',
        password: 'your_password',
        database: 'your_database_name',
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Ensure compatibility with utf8mb4
        },
        logging: false, // Optionally disable logging for better performance
    },
    production: {
        username: 'your_username',
        password: 'your_password',
        database: 'your_database_name',
        host: 'your_production_host',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4', // Ensure this is also set for production
        },
        logging: false,
    },
};
//# sourceMappingURL=database.js.map