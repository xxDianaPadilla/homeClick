import express from 'express';
import jwt from 'jsonwebtoken';
import {config} from '../config.js';

const router = express.Router();

router.get('/verify', (req, res) => {
    try {
        const token = req.cookies.authToken;
        
        if (!token) {
            return res.status(401).json({ 
                message: 'No token provided',
                isAuthenticated: false 
            });
        }

        const decoded = jwt.verify(token, config.JWT.secret);
        
        res.status(200).json({
            id: decoded.id,
            userType: decoded.userType,
            isAuthenticated: true
        });
        
    } catch (error) {
        console.error('Error verificando token:', error);
        
        res.status(401).json({ 
            message: 'Invalid or expired token',
            isAuthenticated: false 
        });
    }
});

export default router;