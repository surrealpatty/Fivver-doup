"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const EditService_vue_1 = __importDefault(require("../components/EditService.vue")); // Make sure this points to the correct component
const routes = [
    // Other routes...
    {
        path: '/services/:id/edit',
        name: 'EditService',
        component: EditService_vue_1.default,
        props: true, // This allows you to pass the `id` parameter to the component
    },
];
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes,
});
exports.default = router;
