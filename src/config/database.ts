import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'fiverr_clone',
  models: [__dirname + '/models'], // Path to your models directory
});

export { sequelize };
