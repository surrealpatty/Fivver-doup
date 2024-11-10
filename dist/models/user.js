"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Sequelize instance configuration
const sequelize = new Sequelize({
    username: 'your_username',
    password: 'your_password',
    database: 'your_database_name',
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        charset: 'utf8mb4', // Ensuring charset compatibility
    },
    logging: false, // Optional: Disable logging for better performance
});
exports.default = sequelize;
//# sourceMappingURL=user.js.map