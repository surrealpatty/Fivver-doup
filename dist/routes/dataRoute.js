// src/routes/dataRoute.ts
import express from 'express';
import axios from 'axios';
const router = express.Router();
// Define a route to fetch data from an external API
router.get('/fetch-data', async (req, res) => {
    try {
        const response = await axios.get('http://example.com/api/data');
        res.json(response.data); // Send back the fetched data
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching data' });
    }
});
export default router;
//# sourceMappingURL=dataRoute.js.map