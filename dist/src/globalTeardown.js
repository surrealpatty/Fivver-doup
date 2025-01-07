"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _index = require("./index");
if (_index.server && typeof _index.server.close === 'function') {
    _index.server.close(()=>{
        console.log('Server closed successfully.');
    });
} else {
    console.log('Server is not running or has already been closed.');
}
