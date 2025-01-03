import { sequelize } from './config/database'; // Correct import
async function syncDatabase() {
    try {
        // Force sync will drop and recreate the table if it exists
        await sequelize.sync({ force: true });
        console.log('Database synchronized successfully!');
    }
    catch (error) {
        console.error('Error syncing database:', error);
    }
}
syncDatabase();
