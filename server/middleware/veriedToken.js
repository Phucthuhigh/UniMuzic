import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const verifiedToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res
            .status(400)
            .json({ success: false, message: "Access token not found." });
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error.message);
        return res
            .status(400)
            .json({ success: false, message: "Invalid token." });
    }
};

export default verifiedToken;
