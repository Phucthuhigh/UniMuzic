import express from "express";
import mongoose from "mongoose";
import authRouter from "../server/routes/auth.js";
import dotenv from "dotenv";
import zingRouter from "../server/routes/ZingRouter.js";
import uploadRouter from "./routes/upload.js";
import Grid from "gridfs-stream";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected!");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

connectDB();

const app = express();

const conn = mongoose.connection;
let gfs, gridfsBucket;
conn.once("open", () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: "photos",
    });

    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});

app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/music", zingRouter);
app.get("/api/upload/avatar/:avatar", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.avatar });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.send(error.message);
    }
});

app.delete("api/upload/avatar/:avatar", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.avatar });
        res.send("Successfully.");
    } catch (error) {
        console.log(error);
        res.send("An error occurred.");
    }
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
