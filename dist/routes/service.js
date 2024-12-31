import { Router } from 'express';
const router = Router();
// Example route: /some-route
router.get('/some-route', (req, res) => {
    return res.status(200).send('Success');
});
// Export the router to be used in app.js or index.js
export default router;
//# sourceMappingURL=service.js.map