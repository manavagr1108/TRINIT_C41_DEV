import express from "express";
const router = express.Router();
import {getDetailsGoogle,loggedIn } from "../controllers/auth.js";

router.get('/google/callback',getDetailsGoogle);
router.get('/loggedIn',loggedIn);
router.get('/hello',()=>{
    console.log("Hiii");
    return 0;
})
export default router;