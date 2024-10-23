const app = require('./app'); // Import the main app from app.js

// Define the port for the application
const PORT = process.env.PORT || 3000;

// Optionally, you could run database migrations or seed your database here
// Example: await runMigrations(); or await seedDatabase();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
