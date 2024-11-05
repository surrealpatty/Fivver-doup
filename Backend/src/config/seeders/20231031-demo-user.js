const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const hashedPassword = await bcrypt.hash('password123', saltRounds);
        await queryInterface.bulkInsert('Users', [
            {
                username: 'testuser',
                password: hashedPassword, // Store the hashed password
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
