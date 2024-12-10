// src/controllers/profileController.ts
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getProfile: function() {
        return getProfile;
    },
    updateProfile: function() {
        return updateProfile;
    }
});
const _user = require("@models/user");
const getProfile = async (req, res)=>{
    const userId = req.user?.id; // Extract user id from the token
    try {
        // Find the user by their ID
        const user = await _user.User.findByPk(userId);
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};
const updateProfile = async (req, res)=>{
    const userId = req.user?.id; // Extract user id from the token
    const { email, username } = req.body;
    try {
        // Find the user and update their details
        const user = await _user.User.findByPk(userId);
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            });
            return;
        }
        user.email = email || user.email; // If email is provided, update it, else keep current value
        user.username = username || user.username; // Same for username
        await user.save();
        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                tier: user.tier
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Internal server error'
        });
    }
};

//# sourceMappingURL=profileController.js.map