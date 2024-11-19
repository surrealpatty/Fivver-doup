import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user';

const router = Router();

// POST route for user registration or similar
router.post(
  '/register', 
  [
    // Validation rules for the request body
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters'),
  ],
  async (req, res) => {
    // Validate the request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Example of inserting a new user into the database
      const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
      });

      // Respond with the new user data
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle any errors that occur
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Example GET route for fetching users based on a reviewed user ID
router.get('/reviewed-users', async (req, res) => {
  try {
    // Sequelize query to fetch users with a specific reviewedUserId
    const users = await User.findAll({
      where: { reviewedUserId: req.user?.id }, // Ensure req.user?.id is correct
    });

    // Respond with the list of users
    return res.status(200).json({ users });
  } catch (error) {
    // Handle any errors that occur
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
