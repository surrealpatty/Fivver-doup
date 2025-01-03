"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = /*#__PURE__*/ _interop_require_default(require("./models/user"));
const _services = require("./models/services");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
// Insert a test user
_user.default.create({
    id: 'b6e01bc7-0f64-421b-b4dd-a8aa2b339b57',
    email: 'test@example.com',
    password: 'hashedPasswordHere',
    username: 'testuser',
    tier: "free",
    role: 'user',
    isVerified: false // Correct property name (camelCase)
}).then((user)=>{
    console.log('User created:', user);
    // Optionally, insert a test service for the created user
    return _services.Service.create({
        title: 'Web Development',
        description: 'Full-stack web development services.',
        price: 500,
        userId: user.id
    });
}).then((service)=>{
    console.log('Service created:', service);
}).catch((error)=>{
    console.error('Error:', error);
});
