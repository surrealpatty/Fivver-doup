import { Router, Request, Response } from 'express';
import { getUser, createUser } from '../controllers/userController';

// Define interface for request body types (you can adjust this as needed)
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
  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred while retrieving the user' });
  }
});

// Route to create a new user
router.post('/users', async (req: Request<{}, {}, CreateUserRequestBody>, res: Response) => {
  const { username, email } = req.body;

  try {
    const newUser = await createUser(username, email);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message || 'An error occurred while creating the user' });
  }
});

export default router;
