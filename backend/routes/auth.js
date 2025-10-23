// backend/routes/auth.js

import express from 'express';
import bcrypt from 'bcrypt'; // Required for password hashing/comparison
import jwt from 'jsonwebtoken'; // Required for generating tokens
import User from '../modles/User.js'; // Your Mongoose User Model

const router = express.Router();

// NOTE: Set a secure, secret key in your .env file
const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret_key_needs_to_be_long_and_random';

// --- SIGNUP ROUTE: Creates the user in the database ---
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists. Please login.' });
        }
        
        // 2. Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // 3. Create and save the new user to MongoDB
        user = new User({
            name,
            email,
            password: hashedPassword // Saving the HASHED password
        });
        
        await user.save();
        
        // 4. Generate token for immediate login after signup
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ 
            success: true, 
            message: 'Registration successful and logged in.',
            token
        });

    } catch (error) {
        console.error("Signup error:", error);
        // Log the actual error for debugging
        res.status(500).json({ message: 'Server error during registration.' });
    }
});


// --- LOGIN ROUTE: Authenticates the user ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find User by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // 2. Compare the plain password with the HASHED password in DB
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }
        
        // 3. Generate JWT Token on successful match
        const payload = { userId: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        
        // Login successful! Send the token back.
        return res.status(200).json({ 
            message: 'Login successful.', 
            token: token 
        });
        
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: 'Server error during login.' });
    }
});


//logout
// --- LOGOUT ROUTE: Confirms logout on the server (if needed) ---
router.post('/logout', (req, res) => {
    // We don't need to do anything complex for simple JWTs.
    // The client handles the token removal. This endpoint is for future needs.
    res.status(200).json({ message: 'Logout confirmed by server. Token removal is client-side.' });
});



export default router;