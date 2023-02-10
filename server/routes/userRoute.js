import express from "express";
const router = express.Router();
import {getDetailsGoogle,loggedIn } from "../controllers/auth.js";

router.get('/google/callback',getDetailsGoogle);
router.get('/loggedIn',loggedIn);
export default router;