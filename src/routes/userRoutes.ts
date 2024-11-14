// userRoutes.ts
import { Router, Request, Response } from 'express';
import { getUser, createUser } from '../controllers/userController';

const router = Router();

router.get('/users/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  getUser(userId)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json({ error: err.message }));
});

router.post('/users', (req: Request, res: Response) => {
  const { username, email } = req.body;
  createUser(username, email)
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default router;
