"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _sequelizetypescript = require("sequelize-typescript");
const _user = require("../models/user");
const _services = require("../models/services");
// Initialize Sequelize with models
const sequelize = new _sequelizetypescript.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'password',
    database: 'fivver_doup',
    models: [
        _user.User,
        _services.Service
    ]
});
// Sync the models before running tests
beforeAll(async ()=>{
    // Ensure database is in sync with models
    await sequelize.sync({
        force: true
    }); // 'force: true' to drop and re-create tables for a clean state
});
// Clean up after tests
afterAll(async ()=>{
    await sequelize.close(); // Close the Sequelize connection after tests
});
// Example test to check the association
test('Service can be associated with User', ()=>{
    // Check if the 'belongsTo' association is defined for the Service model
    expect(_services.Service.belongsTo).toBeDefined();
});
