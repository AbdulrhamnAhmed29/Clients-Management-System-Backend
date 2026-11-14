import express from "express"
import dotenv from "dotenv"
import { connectDb } from "./src/config/db.js";
import { ticketRouter } from "./src/features/tickets/routes.js";
import { queueRouter } from "./src/features/queues/routes.js";
import { userRouter } from "./src/features/users/routes.js";
import { ZodError } from "zod";
import { AuthRoutes } from "./src/auth/routes.js";
import { tenantRouter } from "./src/features/tenant/routes.js";
dotenv.config()
const app = express();
const PORT = process.env.PORT
app.use(express.json());

// routes  

app.use("/api/auth", AuthRoutes)
app.use("/api/ticket", ticketRouter)
app.use("/api/queues", queueRouter)
app.use("/api/users", userRouter)
app.use("/api/tenant" , tenantRouter)

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
