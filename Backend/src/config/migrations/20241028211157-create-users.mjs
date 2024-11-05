// 20241028211157-create-users.mjs
import { DataTypes } from 'sequelize';

export const up = async (queryInterface) => {
    await queryInterface.createTable('Users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
};

export const down = async (queryInterface) => {
    await queryInterface.dropTable('Users');
};
