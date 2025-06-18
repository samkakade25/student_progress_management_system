import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes";


const app = express()
app.use(cors({ origin: "http://localhost:5173"}))
app.use(express.json())

app.use("/students", studentRoutes)

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000")
})