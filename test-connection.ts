import { Sequelize } from 'sequelize';
import config from './src/config/config';  // Remove .ts extension

const sequelize = new Sequelize(config as any);  // Cast config as 'any'

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection successful!');
  } catch (error) {
    console.error('Unable to connect:', error);
  }
}

testConnection();
