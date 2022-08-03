import express from "express";
const router = express.Router();

import ordersRoute, {statusRoute, bookingRoute, bookingstatusRoute} from "../controllers/paycontroller.js";

router.post("/orders",ordersRoute);
router.post("/paymentstatus",statusRoute);

router.post("/booking",bookingRoute);
router.post("/bookingpaymentstatus",bookingstatusRoute);

export default router;