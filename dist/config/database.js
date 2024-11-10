"use strict";
// src/config/database.js
module.exports = {
    development: {
        username: 'your_username',
        password: 'your_password',
        database: 'your_database_name',
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8mb4' // Set the charset to utf8mb4 for compatibility
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
            charset: 'utf8mb4' // Ensure this is also set for production
        },
        logging: false,
    },
};
//# sourceMappingURL=database.js.map