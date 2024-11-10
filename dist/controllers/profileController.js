"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const { User } = require('../models/user'); // Adjust the path as necessary
const jwt = require('jsonwebtoken');
// Get User Profile
exports.getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user; // Assuming the user ID is stored in the JWT payload
        // Fetch user data from the database using the user ID
        const user = yield User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Return the user's profile details (you can choose to exclude sensitive fields like password)
        const _a = user.toJSON(), { password } = _a, userProfile = __rest(_a, ["password"]); // Exclude password from response
        return res.status(200).json(userProfile); // Respond with user profile
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        return res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});
// Update User Profile
exports.updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user; // Get the user ID from the JWT token (assumed to be in req.user)
    const { username, email, bio } = req.body; // Assuming these are the fields you're allowing to update
    // Validate the input
    if (!username && !email && !bio) {
        return res.status(400).json({ message: 'At least one field (username, email, bio) must be provided to update' });
    }
    try {
        // Find the user by ID
        const user = yield User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Update the user's information (only update fields that are provided)
        if (username)
            user.username = username;
        if (email)
            user.email = email;
        if (bio)
            user.bio = bio;
        // Save the updated user data
        yield user.save();
        // Return the updated user profile (excluding sensitive information)
        const _a = user.toJSON(), { password } = _a, updatedProfile = __rest(_a, ["password"]); // Exclude password
        return res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
    }
    catch (error) {
        console.error('Error updating profile:', error);
        return res.status(500).json({ message: 'Error updating profile', error: error.message });
    }
});
// Delete User Profile (optional)
exports.deleteProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user; // Get user ID from the token
    try {
        const user = yield User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Delete the user
        yield user.destroy();
        // Respond with a success message
        return res.status(200).json({ message: 'Profile deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting profile:', error);
        return res.status(500).json({ message: 'Error deleting profile', error: error.message });
    }
});
//# sourceMappingURL=profileController.js.map