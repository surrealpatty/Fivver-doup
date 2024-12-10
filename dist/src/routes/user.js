"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default" // Default export
, {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _express = require("express");
const userRouter = (0, _express.Router)();
// Define your routes here, e.g.:
userRouter.get('/', (req, res)=>{
    res.send('User route');
});
const _default = userRouter;

//# sourceMappingURL=user.js.map