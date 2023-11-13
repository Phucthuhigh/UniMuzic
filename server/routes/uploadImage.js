import upload from "../middleware/upload.js";
import express from "express";
import Grid from "gridfs-stream";
import { ObjectId } from "mongodb";
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

// @route POST /upload
// @desc Upload image
// @access public
router.post("/upload", upload.single("photo"), (req, res) => {
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
    return res.status(200).json({ success: true, message: req.file.id });
});

// @route GET /:id
// @desc Show the image
// @access public
router.get("/:id", async (req, res) => {
    try {
        const file = await gfs.files.findOne({
            _id: new ObjectId(req.params.id),
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

// @route DELETE /:id
// @desc Delete the image
// @access public
router.delete("/:id", async (req, res) => {
    try {
        await gfs.files.deleteOne({ _id: new ObjectId(req.params.id) });
        return res.json({
            success: true,
            message: "Successfully delete image.",
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

export default router;
