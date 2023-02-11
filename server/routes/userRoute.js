import express from "express";
const router = express.Router();
import {getAllDetails, getDetailsGoogle,loggedIn,storeDataGlobal } from "../controllers/auth.js";

router.get('/google/callback',getDetailsGoogle);
router.get('/loggedIn',loggedIn);
router.post('/storeData',storeDataGlobal)
router.get('/getAllUrls',getAllDetails);
export default router;