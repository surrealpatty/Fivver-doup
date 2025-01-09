// src/test/testUserDelete.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
const _types = require("../types");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('User Deletion', ()=>{
    beforeAll(async ()=>{
        // Sync the database before running the tests to ensure tables are created
        await _database.sequelize.sync({
            force: true
        });
    });
    afterAll(async ()=>{
        // Close the sequelize connection after all tests
        await _database.sequelize.close();
    });
    it('should delete a user', async ()=>{
        // Create a new user for testing deletion using the enums for role and tier
        const user = await _user.default.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: _types.UserRole.User,
            tier: _types.UserTier.Free,
            isVerified: false
        });
        const userId = user.id; // Get the ID of the created user
        // Call the function to delete the user
        const deletedUser = await _user.default.destroy({
            where: {
                id: userId
            }
        });
        // Assert that the user was deleted (the number of affected rows should be 1)
        expect(deletedUser).toBe(1); // 1 indicates that one row was affected
        // Check if the user is indeed deleted by trying to find them
        const deletedUserCheck = await _user.default.findByPk(userId);
        expect(deletedUserCheck).toBeNull(); // Ensure no user with that ID exists
    });
});
