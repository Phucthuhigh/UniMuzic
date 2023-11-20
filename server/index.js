import express from "express";
import authRouter from "../server/routes/auth.js";
import zingRouter from "../server/routes/ZingRouter.js";
import avatarRouter from "./routes/avatar.js";
import uploadImageRouter from "./routes/uploadImage.js";
import favoriteRoute from "./routes/favorite.js";
import historyRoute from "./routes/history.js";
import connectDB from "./models/config.js";
import cors from "cors";

connectDB();

const app = express();

// @middlewares
app.use(express.json());
app.use(cors());

// @route
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRouter);
app.use("/api/avatar", avatarRouter);
app.use("/api/image", uploadImageRouter);
app.use("/api/music", zingRouter);
app.use("/api/favorite", favoriteRoute);
app.use("/api/history", historyRoute);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
