import upload from "../middleware/upload.js";
import express from "express";

const router = express.Router();

router.post("/avatar", upload.single("avatar"), (req, res) => {
    if (!req.file)
        return res
            .status(400)
            .json({ success: false, message: "You must select a file." });
    const imgUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}/${
        req.file.filename
    }`;
    return res.send(imgUrl);
});

export default router;
