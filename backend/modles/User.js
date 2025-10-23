// backend/modles/User.js

import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: { // This field stores the hashed password
        type: String,
        required: true,
    },
    // You can add more fields like date created, etc.
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;