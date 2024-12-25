import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('fivver_doup', 'root', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
  },
});

export const testConnection = async (): Promise<boolean> => {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error: any) {
    console.error('Unable to connect to the database:', error.message || error);
    return false;
  }
};
