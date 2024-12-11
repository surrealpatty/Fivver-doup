"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/router/index.ts
const vue_router_1 = require("vue-router");
const HomePage_vue_1 = __importDefault(require("../views/HomePage.vue")); // Make sure this path is correct
const UserProfile_vue_1 = __importDefault(require("../views/UserProfile.vue")); // Make sure this path is correct
const EditService_vue_1 = __importDefault(require("../components/EditService.vue")); // Make sure this path is correct
const routes = [
    // Home page route
    { path: '/', component: HomePage_vue_1.default },
    // User profile route
    { path: '/profile', component: UserProfile_vue_1.default },
    // Edit service route, expects a service id as a parameter
    {
        path: '/services/:id/edit',
        name: 'EditService',
        component: EditService_vue_1.default,
        props: true, // This will pass the `id` parameter as a prop to EditService component
    },
];
// Create the router instance with history mode and routes
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(), // This uses HTML5 history mode
    routes,
});
exports.default = router;
//# sourceMappingURL=index.js.map