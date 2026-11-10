import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./src/config/db.js";
import { ticketRouter } from "./src/features/tickets/routes.js";
import { ZodError } from "zod";
dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(express.json());

// routes  
app.use("/api/ticket", ticketRouter)

app.use((error, req, res, next) => {
    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Invalid request body",
            errors: error.issues.map(({ path, message }) => ({
                field: path.join("."),
                message,
            })),
        });
    }

    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
});

connectDb()
app.listen(PORT, () => {
    console.log(`server has been successfully in https//localhost:${PORT}`);
})
