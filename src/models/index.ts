import { Sequelize, DataTypes } from 'sequelize';
import { defineUser } from './user';
import { defineService } from './services';
import { defineReview } from './review';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  database: 'fivver_doup',
  username: 'root',
  password: '',
});

const User = defineUser(sequelize, DataTypes);
const Service = defineService(sequelize, DataTypes);
const Review = defineReview(sequelize, DataTypes);

// Define relationships
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Service.hasMany(Review, { foreignKey: 'serviceId', as: 'reviews' });
Review.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });

User.hasMany(Review, { foreignKey: 'userId', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { sequelize, User, Service, Review };
