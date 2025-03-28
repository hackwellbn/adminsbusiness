import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRouter from "./Routes/products.routes.js"
import cors from 'cors'
dotenv.config()


connectDB()
const app = express()
app.use(express.json())

const corsOptions = {
    origin:'*',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/api', productRouter)

const CFG = {
    PORT: process.env.PORT || 5000
}

app.listen(CFG.PORT, ()=>{
    console.log(`Server running on port ${CFG.PORT}`);
})
