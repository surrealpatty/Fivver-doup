"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = /*#__PURE__*/ _interop_require_default(require("../config/database"));
const _index = require("../index");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Global teardown to ensure cleanup of resources after all tests
afterAll(async ()=>{
    // Close the database connection if it exists
    if (_database.default) {
        await _database.default.close();
        console.log('Database connection closed.');
    }
    // Close the server if it has a close method (now using the HTTP server)
    if (_index.server && typeof _index.server.close === 'function') {
        await new Promise((resolve)=>{
            _index.server.close(()=>{
                resolve();
                console.log('Server closed.');
            });
        });
    }
});
