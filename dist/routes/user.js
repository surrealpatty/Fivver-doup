import { Router } from 'express';
const userRoutes = Router();
// Define routes
userRoutes.get('/', (req, res) => res.send("User routes"));
export { userRoutes }; // Correct named export
