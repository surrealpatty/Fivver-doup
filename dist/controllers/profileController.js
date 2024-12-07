"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = void 0;
const getUserProfile = (userId) => {
    return {
        id: userId,
        username: 'exampleUser',
        email: 'user@example.com',
        tier: 'free',
    };
};
exports.getUserProfile = getUserProfile;
