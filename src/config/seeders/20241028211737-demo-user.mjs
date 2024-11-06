// 20241028211737-demo-user.mjs
export const up = async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
        {
            username: 'testuser',
            password: 'password123', // Remember to hash passwords in production
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]);
};

export const down = async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
};
