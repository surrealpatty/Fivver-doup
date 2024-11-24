import User from './user';  // Import User from user.ts
import Service from './service';
import Review from './review';
import Order from './order';

// Export `User` as default
export default User;
export { Service, Review, Order };  // Optionally export other models
