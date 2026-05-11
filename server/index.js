import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express()
app.use(bodyParser.json());

const port = process.env.PORT || 7000;
const mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl)
    .then(() => {
        console.log("DB Connected Successfully")
        app.listen(port, () => {
            console.log(`server is running on port : ${port}`)
        })
    })

    .catch((error) => console.log(error));