'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            // Create the 'users' table with additional profile fields
            yield queryInterface.createTable('users', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                username: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                email: {
                    type: Sequelize.STRING,
                    allowNull: false,
                    unique: true,
                },
                password: {
                    type: Sequelize.STRING,
                    allowNull: false,
                },
                createdAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn('NOW'), // Set default value to current date
                },
                updatedAt: {
                    allowNull: false,
                    type: Sequelize.DATE,
                    defaultValue: Sequelize.fn('NOW'), // Set default value to current date
                },
                // New columns
                profile_picture: {
                    type: Sequelize.STRING,
                    allowNull: true, // Optional field for the user's profile picture URL
                },
                bio: {
                    type: Sequelize.TEXT,
                    allowNull: true, // Optional field for the user's bio
                },
                ratings: {
                    type: Sequelize.FLOAT,
                    allowNull: true,
                    defaultValue: 0.0, // Default value for ratings
                },
                reviews_count: {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    defaultValue: 0, // Default value for reviews count
                },
                service_offerings: {
                    type: Sequelize.JSONB,
                    allowNull: true, // Optional field for service offerings (as a JSON object)
                },
            });
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the 'users' table if it exists
            yield queryInterface.dropTable('users');
        });
    }
};
//# sourceMappingURL=20241028211157-create-users.js.map