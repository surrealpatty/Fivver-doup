"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRouter = (0, express_1.Router)();
// Define your routes here, e.g.:
userRouter.get('/', (req, res) => {
    res.send('User route');
});
exports.default = userRouter; // Default export
