// src/routes/services.ts
import { Router } from 'express';
import { authenticateToken } from '../middlewares/authenticateToken'; // Assuming middleware exists for JWT validation
import { CustomAuthRequest } from '../types'; // Import the custom request type

const router = Router();

// Protect the route with the authenticateToken middleware
router.get('/premium', authenticateToken, (req: CustomAuthRequest, res) => {
  const userRole = req.user?.role;  // TypeScript will now recognize `role` on `req.user`

  // Check if the user has 'Paid' role
  if (userRole === 'Paid') {
    return res.status(200).json({ message: 'Premium service access granted.' });
  } else {
    return res.status(403).json({ message: 'Access denied. Only paid users can access this service.' });
  }
});

export default router;
