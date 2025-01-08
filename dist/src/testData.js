"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("./models/user");
const _services = require("./models/services");
const _types = require("./types");
// Insert a test user without specifying the 'id' field
_user.User.create({
    email: 'test@example.com',
    password: 'hashedPasswordHere',
    username: 'testuser',
    tier: _types.UserTier.Free,
    role: _types.UserRole.User,
    isVerified: false
}).then((user)=>{
    console.log('User created:', user);
    // Optionally, insert a test service for the created user
    return _services.Service.create({
        title: 'Web Development',
        description: 'Full-stack web development services.',
        price: 500,
        userId: user.id.toString(),
        role: _types.UserRole.User
    });
}).then((service)=>{
    console.log('Service created:', service); // Log service creation
}).catch((error)=>{
    console.error('Error:', error); // Catch and log any errors
});
