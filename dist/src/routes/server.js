"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the router
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const _authenticateToken = require("../middlewares/authenticateToken");
const _serviceController = require("../controllers/serviceController");
const router = (0, _express.Router)();
// Example route with middleware applied
router.get('/services', _authenticateToken.authenticateToken, _serviceController.ServiceController.getServices); // Apply authenticateToken middleware
// Example route without authentication
router.get('/some-route', (req, res)=>{
    res.status(200).send('Success');
});
const _default = router;
