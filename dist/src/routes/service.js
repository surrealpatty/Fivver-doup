"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // Export the router to be used in app.js or index.js
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const router = (0, _express.Router)();
// Example route: /some-route
router.get('/some-route', (req, res)=>{
    return res.status(200).send('Success');
});
const _default = router;

//# sourceMappingURL=service.js.map