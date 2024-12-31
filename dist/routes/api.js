// src/routes/api.ts
import express from 'express';
const router = express.Router();
// Define the root route
router.get('/', (req, res) => {
    res.status(200).send('Fiverr backend is running');
});
export default router;
