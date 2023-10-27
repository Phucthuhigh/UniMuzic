import upload from "../middleware/upload.js";
import express from "express";
import Grid from "gridfs-stream";
import { ObjectId } from "mongodb";
import User from "../models/User.js";
import mongoose from "mongoose";

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
// @access public
router.post("/:userId/upload", upload.single("avatar"), async (req, res) => {
    try {
        if (!req.file)
            return res
                .status(400)
                .json({ success: false, message: "You must select a file." });
        if (
            req.file.contentType != "image/jpeg" &&
            req.file.contentType != "image/png"
        )
            return res
                .status(400)
                .json({ success: false, message: "Not an image." });
        let id = await User.findOne({ _id: new ObjectId(req.params.userId) });
        id = id._id;
        await User.updateOne(
            { _id: new ObjectId(req.params.userId) },
            { avatar: req.file.id }
        );
        await gfs.files.deleteOne({ _id: id });
        return res.status(200).json({ success: true, message: req.file.id });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "No file exists.",
        });
    }
});

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
