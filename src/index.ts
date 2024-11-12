// Function to start the server and sync the database
const startServer = async (): Promise<void> => {
    try {
        // Test DB connection
        await testConnection();

        // Ensure the database exists (create it if necessary)
        await sequelize.query('CREATE DATABASE IF NOT EXISTS fivver_doup;');

        // Sync models with the database
        const isDevelopment = process.env.NODE_ENV === 'development';
        const syncOptions = isDevelopment ? { alter: true } : {};  // Alter models in development, use default in production

        await sequelize.sync(syncOptions);
        console.log('Database synced successfully.');

        // Start the Express server
        const PORT = process.env.PORT || 5000;  // Default to 5000 if PORT is not specified in .env
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error starting the server:', error.message);  // Handle error message properly
        } else {
            console.error('Error starting the server:', error);  // Log raw error if it's not an instance of Error
        }
    }
};
