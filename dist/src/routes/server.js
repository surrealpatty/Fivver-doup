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
const router = (0, _express.Router)();
// Example route
router.get('/some-route', (req, res)=>{
    res.status(200).send('Success');
});
const _default = router;

//# sourceMappingURL=server.js.map