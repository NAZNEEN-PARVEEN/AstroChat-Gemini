import jwt from 'jsonwebtoken';
// express import hata diya gaya

// NOTE: JWT_SECRET must match the one used in auth.js
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key_needs_to_be_long_and_random';

const ensureAuth = (req, res, next) => {
    // 1. Header se token nikalen (Bearer prefix ko hatana zaroori)
    const authHeader = req.header('Authorization');
    
    // Check 1: Agar header hi nahi mila ya 'Bearer ' se shuru nahi hota
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication failed. No token provided.' });
    }
    
    // Token generally comes as: 'Bearer <token>'
    const token = authHeader.replace('Bearer ', '');

    try {
        // 2. Token ko verify (jaanch) karein
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // 3. Decoded user information ko request object mein attach karein
        req.userId = decoded.userId; 
        
        // 4. Sab theek hai, toh agle middleware/route function par jaayen
        next();

    } catch (error) {
        // Agar token invalid hai ya expire ho gaya hai
        console.error("JWT Verification failed:", error);
        // User ko batayen ki token invalid hai
        res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
};

export default ensureAuth;