import express from "express";
import { checkEmail, checkName, checkPass } from "../functional/Validate.js";
import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const router = express.Router();

// @route POST /register
// @desc Register
// @access public
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!checkName(username) || !checkPass(password) || !checkEmail(email))
        return res.status(400).json({
            success: false,
            message: "You have entered an invalid username or password.",
        });
    try {
        const checkUsernameAlready = await User.findOne({ username });
        if (checkUsernameAlready)
            return res.status(400).json({
                success: false,
                message: "Username already taken.",
            });

        const checkEmailAlready = await User.findOne({ email });
        if (checkEmailAlready)
            return res.status(400).json({
                success: false,
                message: "Email already taken.",
            });

        // success username and password
        const hashPassword = await argon2.hash(password);
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();

        // Valid
        // Return token
        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "Successfully Registered.",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            message: "Internal server error.",
        });
    }
});

// @route POST /login
// @desc Login
// @access public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!checkEmail(email) || !checkPass(password))
        return res.status(400).json({
            success: false,
            message: "You have entered an invalid username or password.",
        });

    try {
        // Check user by email
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password.",
            });

        // Check password valid
        const passwordValid = await argon2.verify(user.password, password);
        if (!passwordValid)
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password.",
            });

        // Valid
        // Return token
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET
        );

        res.json({
            success: true,
            message: "Successfully logged in.",
            accessToken,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            message: "Internal server error.",
        });
    }
});

export default router;
