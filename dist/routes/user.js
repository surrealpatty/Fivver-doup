"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
// src/routes/user.ts
var express_1 = __importDefault(require("express"));
var userRouter = express_1.default.Router();
exports.userRouter = userRouter;
// Define your routes here
userRouter.get('/', function (req, res) {
    res.send('User routes');
});
