import Razorpay from "razorpay";
import { v4 as uuidv4 } from 'uuid';
import failedPaymentItems, {successPaymentItems, successBookingPayments, failedBookingPayments } from "../models/db.js";

const ordersRoute = async (req, res) => {

    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_VEwOA9dapiKHKk',
            key_secret: 'pPQOT7Nn7c20VzpNHqnB6ngJ'
        });

        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: uuidv4(),
            notes: "item rental",
        };

        await instance.orders.create(options, function (err, order) {
            if (err) {
                console.log("error order creation @ razor: ");
                console.log(err);
                res.status(500).json({ "status": false, "error": err })
            }
            else {
                console.log("new order created")
                res.status(200).json(order)
            }
        });

    } catch (error) {
        console.log("error order creation @ razor catch: ");
        console.log(err);
        res.status(500).json({ "status": false, "error": err })
    }
}

const statusRoute = async (req, res) => {
    const statusData = req.body;

    if (statusData.status) {
        //save to db
        console.log("transaction success")
        // const cartObj = { paymentstatus: statusData.status, statusmessage: statusData.message, date:statusData.date  ,email: statusData.email, cart: statusData.cart, amount: statusData.amount }
        const successPayment = new successPaymentItems(statusData);
        await successPayment.save();
        //  fail   email:statusData.status, refId: JSON.stringify(metadata) NOT NULL,brand VARCHAR(20), price MEDIUMINT(255), imageUrl VARCHAR(200), quantity TINYINT(255) NOT NULL, status VARCHAR(10),  paymentID VARCHAR(50) ,orderId VARCHAR(50),signature VARCHAR(100), FOREIGN KEY (refId) REFERENCES itemdata(refId) 

    }
    else {
        //save to db
        console.log("transaction failed")
        const failedPayment = new failedPaymentItems(statusData);
        await failedPayment.save()


    }
    res.status(200).json({ status: true, message: statusData.status ? "success" : "failure" + " - status saved to DB" })
}

const bookingRoute = async (req, res) => {

    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_VEwOA9dapiKHKk',
            key_secret: 'pPQOT7Nn7c20VzpNHqnB6ngJ'
        });

        const options = {
            amount: req.body.amount * 100, // amount in smallest currency unit
            currency: "INR",
            receipt: uuidv4(),
            notes: "Program Booking",
        };

        await instance.orders.create(options, function (err, order) {
            if (err) {
                console.log("error booking order creation @ razor: ");
                console.log(err);
                res.status(500).json({ "status": false, "error": err })
            }
            else {
                console.log("new booking order created")
                res.status(200).json(order)
            }
        });

    } catch (error) {
        console.log("error booking order creation @ razor catch: ");
        console.log(err);
        res.status(500).json({ "status": false, "error": err })
    }
}

const bookingstatusRoute = async (req, res) => {
    const statusData = req.body;

    if (statusData.status) {
        //save to db
        console.log("booking transaction success")
        const successBookingPayment = new successBookingPayments(statusData);
        await successBookingPayment.save();
    }
    else {
        //save to db
        console.log("booking transaction failed")
        const failedBookingPayment = new failedBookingPayments(statusData);
        await failedBookingPayment.save()
    }
    res.status(200).json({ status: true, message: statusData.status ? "success" : "failure" + " - booking status saved to DB" })
}


export default ordersRoute;
export {statusRoute, bookingRoute, bookingstatusRoute };