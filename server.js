import express from "express"
const app = express();

const port = 8080;


//routes
import { router } from "./crud/fetch.js"
app.use("/fetch", router)
app.use("/post", router)
app.use("/patch", router)

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})
