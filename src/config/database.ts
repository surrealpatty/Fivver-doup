import { Sequelize } from 'sequelize';

// Initialize the Sequelize instance with environment variables
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST, // Ensure these environment variables are set
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
  },
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
