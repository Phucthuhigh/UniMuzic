import express from "express";
import {
    checkEmail,
    checkName,
    checkPass,
    checkPhone,
} from "../functional/Validate.js";
import User from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import verifiedToken from "../middleware/veriedToken.js";
import sendVerifiedEmailToken from "../utils/sendVerifiedEmailToken.js";
import { randomBytes } from "node:crypto";

const router = express.Router();

// @route POST /auth/
// @desc Register
// @access private
router.get("/", verifiedToken, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.userId }).select(
            "-password"
        );
        if (!user)
            return res
                .status(400)
                .json({ success: false, message: "User not found." });
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({
            success: true,
            message: "Internal server error.",
        });
    }
});

// @route POST /auth/register
// @desc Register
// @access public
router.post("/register", async (req, res) => {
    const { username, email, password, confirmPassword, phoneNumber } =
        req.body;
    if (
        !checkName(username) ||
        !checkPass(password) ||
        !checkEmail(email) ||
        password !== confirmPassword
    )
        return res.status(400).json({
            success: false,
            message: "You have entered an invalid information.",
        });
    if (phoneNumber && !checkPhone(phoneNumber))
        return res.status(400).json({
            success: false,
            message: "You have entered an invalid information.",
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
        const emailToken = randomBytes(64).toString("hex");
        const newUser = new User({
            username,
            email,
            password: hashPassword,
            emailToken,
            phoneNumber,
        });
        await newUser.save();

        sendVerifiedEmailToken(newUser);

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
        console.log(error.message);
        res.status(500).json({
            success: true,
            message: "Internal server error.",
        });
    }
});

// @route POST /auth/login
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
        console.log(error.message);
        res.status(500).json({
            success: true,
            message: "Internal server error.",
        });
    }
});

// @route POST /auth/verify-email
// @desc Verify email
// @access private
router.post("/verify-email", async (req, res) => {
    try {
        const emailToken = req.body.emailToken;

        if (!emailToken)
            return res
                .status(400)
                .json({ success: false, message: "Email token not found." });
        const user = await User.findOne({ emailToken });
        if (user) {
            user.emailToken = null;
            user.isVerified = true;

            await user.save();

            const accessToken = jwt.sign(
                { userId: user._id },
                process.env.ACCESS_TOKEN_SECRET
            );

            return res.status(200).json({
                success: true,
                message: "Verified successfully!",
                accessToken,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Email token invalid.",
            });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "Email token invalid.",
        });
    }
});

// @route POST /auth/forgot-password
// @desc Forgot password
// @access private
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user)
            return res.status(400).json({
                success: false,
                message: "User not exist.",
            });
        const token = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "5m",
            }
        );
        console.log(user._id);
        const link = `${process.env.SERVER_URL}/auth/reset-password/${user._id}/${token}`;
        console.log(link);
        res.json({ success: true, link });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: true,
            message: "Internal server error.",
        });
    }
});

// @route POST /auth/reset-password/:id/:token
// @desc Reset password
// @access private
router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
        const user = await User.findById(id);
        if (!user)
            return res.status(400).json({
                success: false,
                message: "User not exist.",
            });
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            const hashPassword = await argon2.hash(password);
            await User.findByIdAndUpdate(id, { password: hashPassword });
            res.json({
                success: true,
                message: "Update password successfully.",
            });
        } catch (error) {
            console.log(error.message);
            res.status(400).json({ success: false, message: "Invalid token." });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: true,
            message: "Internal server error.",
        });
    }
});

export default router;
