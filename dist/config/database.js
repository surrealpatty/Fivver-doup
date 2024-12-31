import { Sequelize } from 'sequelize';
// Initialize the Sequelize instance with environment variables
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST, // Ensure these environment variables are set correctly
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT), // Ensure that DB_PORT is set in your environment variables
    dialectOptions: {
        charset: 'utf8mb4', // Change the charset to utf8mb4 for compatibility
        collate: 'utf8mb4_general_ci', // Collate setting for utf8mb4
    },
    logging: false, // Disable logging if you don't need SQL queries to be logged
});
// Authenticate the Sequelize connection to ensure it works
sequelize.authenticate()
    .then(() => {
    console.log('Database connected successfully!');
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
export { sequelize }; // Named export
