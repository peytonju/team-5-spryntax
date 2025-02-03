const User = require('../models/user');

exports.createUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const newUser = await User.create({ username, password, email });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
