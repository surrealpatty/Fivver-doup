import { Router } from 'express';
const router = Router();
// Example route
router.get('/some-route', (req, res) => {
    res.status(200).send('Success');
});
// Export the router
export default router;
//# sourceMappingURL=server.js.map