import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import generateToken from "../services/authUser.js";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {    
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    age: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
    },
    role: {
        type: String,
        default: 'user'
    },
    created: {
        type: Date,
        default: Date.now
    },  
});

userSchema.pre('save', async function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    
    user.password = hashedPassword;
    user.salt = salt; 

    next();
});

userSchema.static('matchPasswordAndGenerateToken', async function(email, password) {
    try {
        const user = await this.findOne({ email });
        if (!user) return false;

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return false;
        
        const token = generateToken({ id: user._id, role: user.role }); 
        
        return token;
    } catch (error) {
        console.error('Error matching password:', error); 
        return false;
    }
});

const User = mongoose.model('User', userSchema);
export default User;
