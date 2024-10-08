const jwt = require('jsonwebtoken');
const User = require('../models/user');

const protect = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Not authorized' });
    }
};

module.exports = protect;
