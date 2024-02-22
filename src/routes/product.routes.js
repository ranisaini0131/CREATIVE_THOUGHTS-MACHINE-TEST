import { Router } from "express";
import uploads from '../middleware/upload';
import { createProducts, deleteProduct, getAllProducts, updateProduct } from "../controller/product.controller.js"

const router = Router()

router.post("/create-Product",
    uploads.fields([
        {
            name: "avatar",
            maxCount: 10
        }
    ])
    , createProducts)

router.get('/products', getAllProducts)

router.patch("/updatedProducts", updateProduct)

router.delete("/deletedProduct", deleteProduct)



export default router