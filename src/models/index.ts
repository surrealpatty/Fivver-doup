// src/models/index.ts
import  User from './user';
import { UserCreationAttributes } from './user';
import  Service  from './service';  // Correct import for the default export
import Review from './review';
import Order from './order';

// Export models
export { User, UserCreationAttributes, Service, Review, Order };
