import { Router } from "express";
import { loginUser, signupUser } from "../controller/user.controllers.js";

const router = Router()

router.post("/signup", signupUser)
router.post("/login", loginUser)



export default router