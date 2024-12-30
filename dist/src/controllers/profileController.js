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
const _user = /*#__PURE__*/ _interop_require_default(require("../models/user"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const getProfile = async (req, res)=>{
    const userId = req.user?.id; // Access user id from req.user
    if (!userId) {
        return res.status(400).json({
            message: 'User not authenticated or invalid user data'
        });
    }
    try {
        // Find the user by their ID
        const user = await _user.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Return the user profile details, including new fields like role and isVerified
        return res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            tier: user.tier,
            isVerified: user.isVerified
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};
const updateProfile = async (req, res)=>{
    const userId = req.user?.id; // Access user id from req.user
    if (!userId) {
        return res.status(400).json({
            message: 'User not authenticated or invalid user data'
        });
    }
    const { email, username, role, tier, isVerified } = req.body; // Get all updateable fields from the request body
    try {
        // Find the user and update their details
        const user = await _user.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }
        // Update user properties if provided
        if (email) {
            user.email = email;
        }
        if (username) {
            user.username = username;
        }
        if (role) {
            user.role = role; // Update role if provided
        }
        if (tier) {
            user.tier = tier; // Update tier if provided
        }
        if (isVerified !== undefined) {
            user.isVerified = isVerified; // Update isVerified if provided
        }
        // Save the updated user object
        await user.save();
        // Return updated user profile
        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                tier: user.tier,
                isVerified: user.isVerified
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

//# sourceMappingURL=profileController.js.map