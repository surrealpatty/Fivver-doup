"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("./models/user");
const _services = require("./models/services");
// Insert a test user
_user.User.create({
    id: 'b6e01bc7-0f64-421b-b4dd-a8aa2b339b57',
    email: 'test@example.com',
    password: 'hashedPasswordHere',
    username: 'testuser',
    tier: "free",
    role: 'user',
    isVerified: false
}).then((user)=>{
    console.log('User created:', user);
    // Optionally, insert a test service for the created user
    return _services.Service.create({
        title: 'Web Development',
        description: 'Full-stack web development services.',
        price: 500,
        userId: user.id,
        role: 'user'
    });
}).then((service)=>{
    console.log('Service created:', service); // Log service creation
}).catch((error)=>{
    console.error('Error:', error); // Catch and log any errors
});
