import express from "express";
import verifiedToken from "../middleware/veriedToken.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/:musicId", verifiedToken, async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.userId, {
            $push: { favorite: req.params.musicId },
        });
        const user = await User.findById(req.userId);
        return res.json({ success: true, user });
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: "No user exists." });
    }
});

export default router;
