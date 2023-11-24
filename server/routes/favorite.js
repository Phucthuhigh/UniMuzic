import express from "express";
import verifiedToken from "../middleware/veriedToken.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/", verifiedToken, async (req, res) => {
    try {
        const { type, id } = req.body;
        let user = await User.findById(req.userId);
        let userFavorite = user.favorite.song.find(
            (element) => element == req.params.musicId
        );
        if (userFavorite)
            return res.status(400).json({
                success: false,
                message: "This song has already in list.",
            });
        userFavorite = user.favorite.playlist.find(
            (element) => element == req.params.musicId
        );
        if (userFavorite)
            return res.status(400).json({
                success: false,
                message: "This song has already in list.",
            });
        userFavorite = user.favorite.artist.find(
            (element) => element == req.params.musicId
        );
        if (userFavorite)
            return res.status(400).json({
                success: false,
                message: "This song has already in list.",
            });
        await User.findByIdAndUpdate(req.userId, {
            $push: { favorite: { [type]: id } },
        });
        user = await User.findById(req.userId);
        return res.json({ success: true, user });
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: "No user exists." });
    }
});

router.delete("/:musicId", verifiedToken, async (req, res) => {
    try {
        let user = await User.findById(req.userId);
        const userFavorite = user.favorite.find(
            (element) => element == req.params.musicId
        );
        if (!userFavorite)
            return res.status(400).json({
                success: false,
                message: "This song has not in this list.",
            });
        await User.findByIdAndUpdate(req.userId, {
            $pull: { favorite: req.params.musicId },
        });
        user = await User.findById(req.userId);
        return res.json({ success: true, user });
    } catch (error) {
        return res
            .status(400)
            .json({ success: false, message: "No user exists." });
    }
});

export default router;
