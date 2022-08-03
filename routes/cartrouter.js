import express from "express";
const router = express.Router();

import readcartitems from "../controllers/cartcontroller.js";

router.post("/readcart",readcartitems);

export default router;