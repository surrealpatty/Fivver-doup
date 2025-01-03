import { sequelize } from '../config/database'; // Correct import
import { User } from '../models/user'; // Ensure the User model is properly imported
// Run migrations or sync models before tests to ensure database is set up correctly
beforeAll(async () => {
    await sequelize.sync(); // Sync the database before running tests
});
describe('User Creation Tests', () => {
    it('should create a user successfully', async () => {
        const user = await User.create({
            username: 'testuser',
            email: 'test@example.com',
            password: 'testpassword', // Add password
            role: 'user', // Add role (default or specific role)
            tier: '1', // Pass '1' as a string instead of a number
            isVerified: false // Add isVerified (default or specific value)
        });
        // Check that the user is created correctly
        expect(user).toBeDefined();
        expect(user.username).toBe('testuser');
        expect(user.email).toBe('test@example.com');
        expect(user.password).toBe('testpassword');
        expect(user.role).toBe('user');
        expect(user.tier).toBe('1'); // Expect '1' as a string
        expect(user.isVerified).toBe(false);
    });
});
afterAll(async () => {
    await sequelize.close(); // Close the connection after tests
});
