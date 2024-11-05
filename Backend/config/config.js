module.exports = {
    development: {
        username: 'your_db_username',
        password: 'your_db_password',
        database: 'your_db_name',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    test: {
        username: 'your_test_db_username',
        password: 'your_test_db_password',
        database: 'your_test_db_name',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
    },
};
