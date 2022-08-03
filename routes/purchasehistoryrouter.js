import express from "express";
const router = express.Router();

import getHistoryData, {getBookingHistoryData, getSingleBookingHistory} from "../controllers/purchasehistorycontroller.js";

router.post("/gethistory",getHistoryData);
router.post("/getbookinghistory",getBookingHistoryData);
router.post("/getsinglebookinghistory",getSingleBookingHistory);

export default router;