"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkIfPaidUser_1 = __importDefault(require("../middlewares/checkIfPaidUser")); // Adjust path accordingly
const router = express_1.default.Router();
// Apply the checkIfPaidUser middleware to this route
router.get('/premium-service', checkIfPaidUser_1.default, (req, res) => {
    // If the middleware passes, this route is executed for paid users
    res.status(200).json({ message: 'You have access to the premium service.' });
});
exports.default = router;
