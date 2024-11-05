console.log('Server is running...');
const userRoutes = require('./src/routes/user');
app.use('/api/user', userRoutes);
