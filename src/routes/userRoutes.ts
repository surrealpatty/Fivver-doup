import { Router, Request, Response } from 'express';
import { getUser, createUser } from '../controllers/userController';

// Define an interface for request body types for creating a user
interface CreateUserRequestBody {
  username: string;
  email: string;
}

const router = Router();

// Route to get a user by ID
router.get('/users/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const user = await getUser(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

// Route to create a new user
router.post('/users', async (req: Request<{}, {}, CreateUserRequestBody>, res: Response) => {
  const { username, email } = req.body;

  try {
    const newUser = await createUser(username, email);
    res.status(201).json(newUser);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
