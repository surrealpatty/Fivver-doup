import express from 'express';
const router = express.Router();

// Define a GET route for '/some-route'
router.get('/', (req, res) => {
  res.status(200).send('Some route');
});

export default router;
