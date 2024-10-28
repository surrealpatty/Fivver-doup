const sequelize = require('./config/database'); // Ensure path to Sequelize instance is correct
const User = require('./models/user'); // Import User model
const Service = require('./models/services'); // Import Service model

// Setting up model associations
User.hasMany(Service, { foreignKey: 'userId', as: 'services' });
Service.belongsTo(User, { foreignKey: 'userId', as: 'user' });

const testModels = async () => {
    try {
        // Synchronize models with the database
        await sequelize.sync({ force: true }); // Use `force: true` cautiously (for testing only)

        // Test User Creation
        const newUser = await User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
        });
        console.log('User created:', newUser.toJSON());

        // Test Service Creation
        const newService = await Service.create({
            title: 'Test Service',
            description: 'This is a test service description.',
            price: 100.0,
            category: 'Testing',
            userId: newUser.id, // Associate the service with the newly created user
        });
        console.log('Service created:', newService.toJSON());

    } catch (error) {
        console.error('Error testing models:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
    }
};

// Call the test function
testModels();
