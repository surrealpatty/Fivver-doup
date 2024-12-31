"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    app: function() {
        return app;
    },
    server: function() {
        return server;
    }
});
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _http = /*#__PURE__*/ _interop_require_default(require("http"));
const _database = require("./config/database");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const app = (0, _express.default)();
// Setup your app (middleware, routes, etc.)
app.get('/', (req, res)=>res.send('Hello World!'));
// Create the HTTP server to use with Express
const server = _http.default.createServer(app);
// Sync sequelize with the database (optional, depending on your setup)
_database.sequelize.sync().then(()=>{
    // Start the server only if not in a test environment
    if (process.env.NODE_ENV !== 'test') {
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        });
    }
});
 // Export both app and server for testing purposes

//# sourceMappingURL=index.js.map