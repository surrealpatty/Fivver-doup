// src/test/testModels.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the function using ES module syntax
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _database = require("../config/database");
const _user = require("../models/user");
const _service = /*#__PURE__*/ _interop_require_default(require("../models/service"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Function to test user and service models
const testModels = async ()=>{
    try {
        // Synchronize models with the database
        await _database.sequelize.sync({
            force: true
        });
        console.log('Database synced successfully.');
        // Create a test user
        const testUser = await _user.User.create({
            username: 'testuser',
            email: 'testuser@example.com',
            password: 'password123',
            role: 'free'
        });
        console.log('Test User created:', testUser.toJSON());
        // Create a test service associated with the user
        const testServiceData = {
            title: 'Test Service',
            description: 'A description of the test service.',
            price: 99.99,
            userId: testUser.id
        };
        // Create the test service using the ServiceCreationAttributes type
        const testService = await _service.default.create(testServiceData);
        console.log('Test Service created:', testService.toJSON());
    } catch (error) {
        console.error('Error testing models:', error);
    } finally{
        // Close the database connection
        await _database.sequelize.close();
    }
};
const _default = testModels;
// Call the function to test models
testModels();

//# sourceMappingURL=testModels.js.map