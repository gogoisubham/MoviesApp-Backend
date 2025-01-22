import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default class Middleware {
    static async authenticateToken (req, res, next) {
        try {
            const authHeader = req.headers["authorization"];
            let token;
            if (authHeader) {
                token = authHeader.split(' ')[1];
            }
            if (!token) {
                return res.status(401).json({status:'fail', message:'Token is required'});
            }
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({status:'fail', message:'Invalid or expired token'});
                }
                req.user = user;
                next();
            });
        }catch (err) {
            console.error(`Error validating token: ${err}`);
            res.status(500).json({status:'fail', message:'Internal server error'});
        };
    };
};