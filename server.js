import express from "express"
import connection from "./db_connection.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv'

const app = express();

dotenv.config({
    path: './env'
})

const port = 8080;


connection.connect((err) => {
    if (err) {
        console.log("ERROR: ", err.message);
    } else {
        console.log("connection created with MySQL successfully!!!")
    }
})


// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routing
import userRouter from "./src/routes/user.routes.js"
import productRouter from "./src/routes/product.routes.js"
import cartRouter from "./src/controller/cart.controller.js"
app.use("/users", userRouter);
app.use("/products", productRouter)
app.use("/cart", cartRouter)



app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
