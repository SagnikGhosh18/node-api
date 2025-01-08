const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            await mongoose.connect(process.env.MONGO_URI);
            const { id } = req.query;
            const user = await User.findById(id);
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }
};
