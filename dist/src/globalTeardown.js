// Correctly import server as a named import from index.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return globalTeardown;
    }
});
const _index = require("./index");
async function globalTeardown() {
    // Close the server if it has a close method
    if (_index.server && typeof _index.server.close === 'function') {
        await _index.server.close(); // Close the server properly after tests
        console.log('Server closed.');
    }
}

//# sourceMappingURL=globalTeardown.js.map