import express from "express"
import mongoose from "mongoose"
import authRouter from "../server/routes/auth.js"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@unimuzic.umblnwn.mongodb.net/?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected!')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(express.json())

app.get('/', (req, res) => res.send("Hello World"))
app.use("/api/auth", authRouter)

const PORT = 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))