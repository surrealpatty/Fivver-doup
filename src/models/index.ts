// src/models/index.ts
import User, { UserCreationAttributes } from './user'; // Import default and named export
import { ServiceCreationAttributes } from './service'; // Import default and named export for Service
import { Service } from './service';
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
