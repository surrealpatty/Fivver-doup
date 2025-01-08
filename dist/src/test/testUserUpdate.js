"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _user = require("../models/user");
const testUpdateUser = async (userId)=>{
    try {
        const updatedUser = await _user.User.update({
            username: 'updatedusername'
        }, {
            where: {
                id: userId
            }
        } // Adjust according to your primary key or identifier
        );
        console.log('User updated:', updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
    }
};
// Replace 1 with an actual user ID from your database
testUpdateUser(1);
