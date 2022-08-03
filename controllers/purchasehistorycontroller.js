import express from "express";
import mysql from 'mysql2';
import failedPaymentItems, {successPaymentItems, failedBookingPayments, successBookingPayments } from "../models/db.js";

const getHistoryData = async (req, res) => {
    // "entrySelect": entrySelect,"entry": entry 
    try {

        if (req.body.entrySelect === "email") {
            const data = [...await failedPaymentItems.find({ email: req.body.entry }), ...await successPaymentItems.find({ email: req.body.entry })]
            // console.log(data);
            // res.status(200).json(data);
            const dateSorted = data.sort((a, b) => (new Date(b.date) - new Date(a.date)));
            res.status(200).json(dateSorted);
        }
        else if (req.body.entrySelect === "date") {
            const data = [...await failedPaymentItems.find({}), ...await successPaymentItems.find({})]
            const dateFiltered = data.filter(ele => (new Date(ele.date).toDateString() === new Date(req.body.entry).toDateString()));
            const dateSorted = dateFiltered.sort((a, b) => (new Date(b.date) - new Date(a.date)));
            // console.log(dateFiltered);
            res.status(200).json(dateSorted);
        }

    } catch (error) {
        console.log("error @ payment history: ");
        console.log(error);
        res.status(500).json({ "status": false, "error": error })
    }
}

const getBookingHistoryData = async (req, res) => {
    // "entrySelect": entrySelect,"entry": entry 
    // console.log(req.body);
    try {

        if (req.body.entrySelect === "email") {
            const data = [...await failedBookingPayments.find({ email: req.body.entry }), ...await successBookingPayments.find({ email: req.body.entry })]
            // res.status(200).json(data);
            const dateSorted = data.sort((a, b) => (new Date(b.date) - new Date(a.date)));
            res.status(200).json(dateSorted);
        }

        else if (req.body.entrySelect === "date") {
            const data = [...await failedBookingPayments.find({}), ...await successBookingPayments.find({})]
            const dateFiltered = data.filter(ele => (new Date(ele.date).toDateString() === new Date(req.body.entry).toDateString()));
            const dateSorted = dateFiltered.sort((a, b) => (new Date(b.date) - new Date(a.date)));
            // console.log(dateFiltered);
            res.status(200).json(dateSorted);
        }

    } catch (error) {
        console.log("error @ booking history: ");
        console.log(error);
        res.status(500).json({ "status": false, "error": error })
    }
}

const getSingleBookingHistory = async (req, res) => {

    try {
        const data = [...await failedBookingPayments.find({ order_id: req.body.orderid }), ...await successBookingPayments.find({ razorpayOrderId: req.body.orderid })]
        res.status(200).json(data);

    } catch (error) {
        console.log("error @ single booking history: ");
        console.log(error);
        res.status(500).json({ "status": false, "error": error })
    }
}

export default getHistoryData;
export {getBookingHistoryData, getSingleBookingHistory }