import { User, UserCreationAttributes } from './user'; // Correct import for User and UserCreationAttributes
import { ServiceCreationAttributes } from './service'; // Import named export for Service
import { Service } from './service'; // Import default export for Service
import Review from './review';
import Order from './order';

// Export models and their creation attributes
export {
  User,
  UserCreationAttributes,
  Service,
  ServiceCreationAttributes,
  Review,
  Order,
};
