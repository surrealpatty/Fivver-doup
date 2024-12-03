// src/models/index.ts
import { User } from './user';  // Named import for User
import  Service  from './service';  // Named import for Service
import { Order } from './order';  // Default import for Order (if Order is the default export)
import { Review } from './review';  // Named import for Review

export { User, Service, Order, Review };  // Exporting models
