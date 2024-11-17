"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = require("express");
var cors_1 = require("cors");
var userRoutes_1 = require("./routes/userRoutes");
var app = (0, express_1.default)();
exports.app = app;
// Middleware setup
app.use((0, cors_1.default)());
app.use(express_1.default.json()); // This will correctly parse the request body as JSON
// Routes
app.use('/users', userRoutes_1.default);
// Start the server if this file is executed directly (not in test environment)
if (require.main === module) {
    app.listen(3000, function () {
        console.log('Server is running on port 3000');
    });
}
