const User = require('../models/user');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        res.render('profile', { user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).send('Internal server error');
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email, profilePicture } = req.body;
        const user = await User.findByPk(req.user.id);
        await user.update({ name, email, profilePicture });
        res.redirect('/profile');
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).send('Internal server error');
    }
};
