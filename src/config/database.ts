import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { User } from '@models/user';  // Correct named import
import { Service } from './models/service';  // Correct relative path

// Load environment variables from .env file
dotenv.config();

// Initialize Sequelize instance with the database configuration
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  logging: false,
  define: {
    timestamps: true,
    freezeTableName: true,
  },
  dialectOptions: {
    supportBigNumbers: true,
    bigNumberStrings: true,
    allowInvalidDates: true,
  },
});

// Sync database models with the schema
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });

// Export the sequelize instance to be used in other files
export { sequelize };

// Ensure that associations between models (like User and Service) are established here
User.hasMany(Service, { foreignKey: 'userId' });
Service.belongsTo(User, { foreignKey: 'userId' });
