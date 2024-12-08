// src/types.d.ts

// Declare the module for './config/database'
declare module './config/database' {
  // Adjusting the type for sequelize export, replace 'any' with more specific type if known
  export const sequelize: import('sequelize').Sequelize;  // Importing Sequelize type from the Sequelize package
}

// Declare the module for './routes/user'
declare module './routes/user' {
  import { Router } from 'express';
  export const userRouter: Router;  // Named export for userRouter
}

// Declare the module for './routes/profile'
declare module './routes/profile' {
  import { Router } from 'express';
  const profileRouter: Router;  // Default export for profileRouter
  export default profileRouter;  // Use 'default' if it’s a default export in profileRouter
}
