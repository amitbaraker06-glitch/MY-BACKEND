const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'No token provided' });
    const token = authHeader.split(' ')[1];
    if (!JWT_SECRET) return res.status(500).json({ success: false, message: 'JWT_SECRET not configured' });
    let decoded;
    try { decoded = jwt.verify(token, JWT_SECRET); } catch (err) { return res.status(401).json({ success: false, message: 'Token invalid or expired' }); }
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) { next(err); }
};
