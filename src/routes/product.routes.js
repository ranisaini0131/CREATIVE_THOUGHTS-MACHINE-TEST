import { Router } from "express";
import { uploads } from "../middleware/multer.middleware.js"
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controller/product.controller.js"

const router = Router()

router.post("/create-Product", uploads.array("avatar", 10), createProduct)

router.get('/allProducts', getAllProducts)

router.patch("/updatedProducts", updateProduct)

router.delete("/deletedProduct/:id", deleteProduct)



export default router