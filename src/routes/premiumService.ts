import express from 'express';
import checkIfPaidUser from '../middlewares/checkIfPaidUser'; // Adjust path accordingly

const router = express.Router();

// Apply the checkIfPaidUser middleware to this route
router.get('/premium-service', checkIfPaidUser, (req, res) => {
  // If the middleware passes, this route is executed for paid users
  res.status(200).json({ message: 'You have access to the premium service.' });
});

export default router;
