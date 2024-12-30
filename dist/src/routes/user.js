"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "userRoutes", {
    enumerable: true,
    get: function() {
        return userRoutes;
    }
});
const _express = require("express");
const userRoutes = (0, _express.Router)();
// Define routes
userRoutes.get('/', (req, res)=>res.send("User routes"));
 // Correct named export

//# sourceMappingURL=user.js.map