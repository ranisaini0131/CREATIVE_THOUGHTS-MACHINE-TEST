import { Router } from "express";
import { addToCart } from "../controller/cart.controller.js";


const router = Router()


router.post("/add-To-Cart", addToCart)



export default router