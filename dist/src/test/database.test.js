"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = require("../config/database");
const _index = /*#__PURE__*/ _interop_require_default(require("../index"));
const _supertest = /*#__PURE__*/ _interop_require_default(require("supertest"));
const _services = require("../models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
describe('Database connection and API routes', ()=>{
    // Async test to check if the database connection is successful
    test('should establish database connection', async ()=>{
        // Ensure the database connection is established before the test
        await _database.sequelize.authenticate(); // This ensures the connection is successful
        console.log('Database connection established');
    });
    // Async test for an API route
    test('should return 200 OK on root route', async ()=>{
        const res = await (0, _supertest.default)(_index.default).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Fiverr backend is running');
    });
    // Test database synchronization and associations
    beforeAll(async ()=>{
        // Sync the models with the database before running tests
        await _database.sequelize.sync({
            force: true
        }); // 'force: true' to drop and re-create tables for a clean state
    });
    afterAll(async ()=>{
        // Clean up after tests
        await _database.sequelize.close(); // Close the Sequelize connection after tests
    });
    // Test if Service can be associated with User
    test('Service can be associated with User', ()=>{
        // Check if the 'belongsTo' association is defined for the Service model
        expect(_services.Service.belongsTo).toBeDefined();
        // You can also check if it's associated correctly with User
        const association = _services.Service.associations.User;
        expect(association).toBeDefined();
    });
});
