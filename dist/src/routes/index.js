// src/router/index.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _vuerouter = require("vue-router");
const _HomePagevue = /*#__PURE__*/ _interop_require_default(require("../views/HomePage.vue"));
const _UserProfilevue = /*#__PURE__*/ _interop_require_default(require("../views/UserProfile.vue"));
const _EditServicevue = /*#__PURE__*/ _interop_require_default(require("../components/EditService.vue"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const routes = [
    // Home page route
    {
        path: '/',
        component: _HomePagevue.default
    },
    // User profile route
    {
        path: '/profile',
        component: _UserProfilevue.default
    },
    // Edit service route, expects a service id as a parameter
    {
        path: '/services/:id/edit',
        name: 'EditService',
        component: _EditServicevue.default,
        props: true
    }
];
// Create the router instance with history mode and routes
const router = (0, _vuerouter.createRouter)({
    history: (0, _vuerouter.createWebHistory)(),
    routes
});
const _default = router;

//# sourceMappingURL=index.js.map