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
            yield queryInterface.bulkInsert('users', [
                {
                    username: 'john_doe',
                    email: 'john@example.com',
                    password: 'hashed_password1', // Use a hashed password in real applications
                    created_at: new Date(),
                },
                {
                    username: 'jane_smith',
                    email: 'jane@example.com',
                    password: 'hashed_password2', // Use a hashed password in real applications
                    created_at: new Date(),
                },
            ], {});
        });
    },
    down(queryInterface, Sequelize) {
        return __awaiter(this, void 0, void 0, function* () {
            // This will remove the seed data by deleting all entries from the users table
            yield queryInterface.bulkDelete('users', null, {});
        });
    }
};
//# sourceMappingURL=20241028211737-demo-user.js.map