import { Router, Request, Response } from 'express';
import { registerUser } from '../controllers/authController'; // Correctly import registerUser
import jwt from 'jsonwebtoken'; // Import jsonwebtoken
import { UserCreationAttributes } from '../models'; // Import UserCreationAttributes

const router = Router();

// Secret key for JWT (accessed from environment variables)
const jwtSecret = process.env.JWT_SECRET;

// Interface to type the request body
interface RegisterRequest extends Request {
  body: UserCreationAttributes; // Extend Request with the UserCreationAttributes type
}

// Function to generate JWT token
const generateToken = (userId: number): string => {
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  // Create a token with the user's ID, which is a number
  const token = jwt.sign({ id: userId.toString() }, jwtSecret, { expiresIn: '1h' }); // Convert to string
  return token;
};

router.post('/register', async (req: RegisterRequest, res: Response) => {
  try {
    // Pass the request and response objects to the registerUser function
    await registerUser(req, res);
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Server error during user registration.' });
  }
});

export default router;
