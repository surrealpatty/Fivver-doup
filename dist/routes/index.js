import { Router } from 'express';
const router = Router();
// Define your routes here
router.get('/', (req, res) => {
    res.send('Welcome to the API');
});
// Export the router as the default export
export default router;
