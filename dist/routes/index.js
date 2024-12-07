"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// Create a router instance for handling service-related routes
var serviceRouter = express_1.default.Router();
// Define your service-related routes here
serviceRouter.get('/', function (req, res) {
    res.send('Service routes');
});
// Export the router as the default export
exports.default = serviceRouter;
