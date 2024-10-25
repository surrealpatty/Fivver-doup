// config.js
const config = {
    development: {
        db: {
            username: 'your_db_username',
            password: 'your_db_password',
            database: 'fivver_doup_db',
            host: 'localhost',
            dialect: 'mysql',
        },
        jwt: {
            secret: 'your_jwt_secret',
        },
    },
    production: {
        db: {
            username: 'your_prod_db_username',
            password: 'your_prod_db_password',
            database: 'fivver_doup_db',
            host: 'localhost',
            dialect: 'mysql',
        },
        jwt: {
            secret: 'your_prod_jwt_secret',
        },
    },
};

module.exports = config;
