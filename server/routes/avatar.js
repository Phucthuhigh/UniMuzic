import upload from "../middleware/upload.js";
import express from "express";
import Grid from "gridfs-stream";
import { ObjectId } from "mongodb";
import User from "../models/User.js";
import mongoose from "mongoose";
import verifiedToken from "../middleware/veriedToken.js";

const router = express.Router();

// @config gridFs
const conn = mongoose.connection;
let gfs, gridfsBucket;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "photos",
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

// @route POST /:userId/upload
// @desc Change avatar profile
// @access private
router.post(
    "/:userId/upload",
    verifiedToken,
    upload.single("avatar"),
    async (req, res) => {
        try {
            if (!req.file)
                return res.status(400).json({
                    success: false,
                    message: "You must select a file.",
                });
            if (
                req.file.contentType != "image/jpeg" &&
                req.file.contentType != "image/png"
            )
                return res
                    .status(400)
                    .json({ success: false, message: "Not an image." });
            let user = await User.findOne({
                _id: new ObjectId(req.params.userId),
            });
            const userAvatarId = user.avatar;
            await User.updateOne(
                { _id: new ObjectId(req.params.userId) },
                { avatar: req.file.id }
            );
            const blankAvatarId = "653bc4ce935189137f39a8f7";
            if (userAvatarId.toString() != blankAvatarId) {
                await gfs.files.deleteOne({ _id: userAvatarId });
            }
            return res
                .status(200)
                .json({ success: true, message: req.file.id });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "No user exists.",
            });
        }
    }
);

// @route GET /:userId
// @desc Show avatar profile
// @access public
router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findOne({
            _id: new ObjectId(req.params.userId),
        });
        const file = await gfs.files.findOne({
            _id: user.avatar,
        });
        if (file) {
            if (
                file.contentType == "image/jpeg" ||
                file.contentType == "image/png"
            ) {
                const readStream = gridfsBucket.openDownloadStream(file._id);
                readStream.pipe(res);
            } else
                return res.status(400).json({
                    success: false,
                    message: "Not an image.",
                });
        } else
            return res.status(400).json({
                success: false,
                message: "No file exists.",
            });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "No file exists.",
        });
    }
});

export default router;
