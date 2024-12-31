import express from 'express';

const app = express();

// Define your routes and middleware here
app.get('/some-route', (req, res) => {
  res.status(200).send('Hello, World!');
});

// Start the server only if not in a test environment
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
export const server = app.listen(3001); // Export the server instance for testing
