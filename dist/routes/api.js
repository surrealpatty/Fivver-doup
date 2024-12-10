"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/api.ts
const express_1 = require("express");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authenticateToken, async (req, res, next) => {
    try {
        // Your route logic here
        res.status(200).send('Success');
    }
    catch (error) {
        next(error);
    }
});
