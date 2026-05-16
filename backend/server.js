import express from "express"
import dotenv from "dotenv"
import db from "./config/db.js";
import router from "./routes/notesRoute.js";
import cors from "cors";

dotenv.config();
db();

const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());
app.use("/api/crud", router)



app.get("/", (req, res) => {
    res.send("SERVER is running");
})

app.listen(port, () => {
    console.log(`SERVER  connected sucessfully on http://localhost:${port}`)
})