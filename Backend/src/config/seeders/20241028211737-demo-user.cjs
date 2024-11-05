// 20241028211737-demo-user.js
export default {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert('Users', [
            {
                username: 'testuser',
                password: 'password123', // Note: Hash passwords in a real application
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('Users', null, {});
    },
};
