import express from "express";
const router = express.Router();

import addItem, {readItem, readSingleItem } from "../controllers/itemcontroller.js";

router.post("/additem",addItem);
router.get("/readitem",readItem);
router.post("/readsingleitem",readSingleItem);

export default router;