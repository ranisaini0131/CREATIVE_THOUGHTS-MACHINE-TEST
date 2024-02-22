import express from "express"
import bodyParser from "body-parser";
import dotenv from 'dotenv'

const app = express();

dotenv.config({
    path: './env'
})

const port = 8000;

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routing
import userRouter from "./src/routes/user.routes.js"
app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
