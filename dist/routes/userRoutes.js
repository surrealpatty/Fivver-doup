"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
// Route to get a user by ID
router.get('/users/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await (0, userController_1.getUser)(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});
// Route to create a new user
router.post('/users', async (req, res) => {
    const { username, email } = req.body;
    try {
        const newUser = await (0, userController_1.createUser)(username, email);
        res.status(201).json(newUser);
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        res.status(500).json({ error: errorMessage });
    }
});
exports.default = router;
//# sourceMappingURL=userRoutes.js.map