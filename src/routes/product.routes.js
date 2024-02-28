import { Router } from "express";
import { uploads } from "../middleware/multer.middleware.js"
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/product.controller.js"

const router = Router()

router.post("/create-Product",
    uploads.fields([
        {
            name: "avatar",
            maxCount: 10
        }
    ])
    , createProduct)

router.get('/products', getAllProducts)

router.patch("/updatedProducts", updateProduct)

router.delete("/deletedProduct", deleteProduct)



export default router