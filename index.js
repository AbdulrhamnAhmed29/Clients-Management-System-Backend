import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./src/config/db.js";
dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(express.json());


connectDb()
app.listen(PORT, () => {
    console.log(`server has been successfully in https//localhost:${PORT}`);
})
