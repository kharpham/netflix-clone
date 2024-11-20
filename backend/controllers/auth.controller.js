import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const {email, username, password, confirmation} = req.body;
        if (!email|| !username || !password || !confirmation) {
            return res.status(400).json({success: false, message: "All fields are required"});
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({success: false, message: "Invalid email format"});
        }
        if (password.length < 6) {
            return res.status(400).json({success: false, message: "Password must be at least 6 characters long"});
        }
        if (password !== confirmation) {
            return res.status(400).json({success: false, message: "Passwords do not match"});
        }
        const existingUserByEmail = await User.findOne({email});
        if (existingUserByEmail) {
            return res.status(400).json({success: false, message: "Email already exists"});
        }
        const existingUserByUsername = await User.findOne({username});
        if (existingUserByUsername) {
            return res.status(400).json({success: false, message: "Username already exists"});
        }

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            username,
            password: hashedPassword, 
            image
        });
        
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        return res.status(201).json({success: true, message: "User created successfully", user: {
            ...newUser._doc,
            password: "",
        }});
                
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export async function login(req, res) {
    res.send("Login route");
}

export async function logout(req, res) {
    res.send("Logout route");
}