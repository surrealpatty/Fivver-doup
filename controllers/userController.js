// controllers/userController.js
const UserProfile = require('../models/UserProfile');

exports.createProfile = async (req, res) => {
  try {
    const { userId, name, skills, services, experience, isPaid } = req.body;
    const profile = await UserProfile.create({
      userId,
      name,
      skills,
      services,
      experience,
      isPaid,
    });
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error creating profile' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findByPk(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    await profile.update(req.body);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
};
