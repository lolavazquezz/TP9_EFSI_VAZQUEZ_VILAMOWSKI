import jwt from 'jsonwebtoken';

const JWT_SECRET = 'KvduPPiIG7NJ2Quhk5jGMy6z2YizmG';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).send("Forbidden: No token provided");
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send("Forbidden: Invalid token");
        }
        req.user = user;
        next();
    });
};

export default authenticateToken;