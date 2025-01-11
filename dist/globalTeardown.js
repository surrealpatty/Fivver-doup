"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/globalTeardown.ts
const index_1 = require("./index"); // Import the server from index.ts
if (index_1.server && typeof index_1.server.close === 'function') {
    index_1.server.close(() => {
        console.log('Server closed successfully.');
    });
}
else {
    console.log('Server is not running or has already been closed.');
}
