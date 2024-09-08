
const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    try {
        token = token.split(' ')[1]; // Assuming token is in "Bearer <token>" format
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Ensure this is the correct structure
        if (!req.user) {
            return res.status(401).json({ msg: 'Token is not valid' });
        }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.admin = (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access denied, admin only' });
    }
    next();
};