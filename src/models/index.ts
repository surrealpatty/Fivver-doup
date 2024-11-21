import { Sequelize, DataTypes } from 'sequelize';
import { ModelWithAssociations } from './ModelWithAssociations'; // Import the interface if needed

// Import your models
import User from './user';
import Service from './services';
import Review from './review';

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql', // Set the appropriate dialect (e.g., mysql, postgres)
  host: 'localhost', // Replace with your database host
  database: 'fivver_doup', // Replace with your database name
  username: 'root', // Replace with your database username
  password: '', // Replace with your database password
});

// Add all models to Sequelize instance
const models = {
  User: User(sequelize, DataTypes),
  Service: Service(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
};

// Set up associations (if any)
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models); // Call the associate method if it exists
  }
});

// Export sequelize and models
export { sequelize, models };

// Example associations (optional, adapt as per your needs)
models.User.hasMany(models.Service, { foreignKey: 'userId' });
models.Service.belongsTo(models.User, { foreignKey: 'userId' });

models.Service.hasMany(models.Review, { foreignKey: 'serviceId' });
models.Review.belongsTo(models.Service, { foreignKey: 'serviceId' });

models.User.hasMany(models.Review, { foreignKey: 'userId' });
models.Review.belongsTo(models.User, { foreignKey: 'userId' });
