"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/dataRoute.ts
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
// Define a route to fetch data from an external API
router.get('/fetch-data', async (req, res) => {
    try {
        const response = await axios_1.default.get('http://example.com/api/data');
        res.json(response.data); // Send back the fetched data
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});
exports.default = router;
//# sourceMappingURL=dataRoute.js.map