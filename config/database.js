
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'yourpassword',
    database: 'fivver_doup',
    dialectOptions: {
      charset: 'utf8mb4', // Use utf8mb4 instead of cesu8 to avoid encoding issues
    },
  });
  