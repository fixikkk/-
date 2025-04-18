import express from "express";
import { calculateMortgage } from "../controllers/mortgageController.js";
const router = express.Router();

router.post("/mortgage", calculateMortgage);

export default router;