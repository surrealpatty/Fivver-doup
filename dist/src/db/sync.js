// src/db/sync.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _database = /*#__PURE__*/ _interop_require_default(require("../config/database"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Function to sync database and create tables
async function syncDatabase() {
    try {
        // Force sync will drop and recreate the tables
        await _database.default.sync({
            force: true
        });
        console.log('Database synchronized successfully!');
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}
// Call the sync function
syncDatabase();
