"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the router as the default export
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const router = (0, _express.Router)();
// Define your routes here
router.get('/', (req, res)=>{
    res.send('Welcome to the API');
});
const _default = router;
