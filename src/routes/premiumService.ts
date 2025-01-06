import express from 'express';

const premiumServiceRoutes = express.Router();

// Define your routes here
premiumServiceRoutes.get('/', (req, res) => {
  res.status(200).send('Premium service route');
});

// Export the routes as a default export
export default premiumServiceRoutes;  // Default export
