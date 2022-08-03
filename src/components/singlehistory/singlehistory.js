import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './singlehistory.css';
import Loader from "../loader/loader.js";
import axios from "axios";
import { userStore } from '../../zustand/store';

function Singlehistory() {
    const { orderid } = useParams();              //-----> refer App.js

    const loginState = userStore(state => state.user.loginState);

    const [isBookingLoaded, setIsBookingloaded] = useState(false);
    const [bookingDetails, setBookingDetails] = useState("");

    const CatogoryArr = ["PA System", "Illuminary", "Power System"]

    useEffect(() => {

        const fetchBookingHistory = () => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER_URL}/purchasehistory/getsinglebookinghistory`,
                data: { orderid: orderid },
                responseType: 'json',
            })
                .then((resp) => {
                    // if (resp.status === 200) {
                        console.log("fetched booking history");
                        setBookingDetails(...resp.data);
                        setIsBookingloaded(true);
                    // }
                    // else {
                    //     console.log("error api fetch @ booking history: ")
                    //     console.log(resp.status + " : " + resp.statusText)
                    //     setIsBookingloaded(true);
                    // }
                })
                .catch(err => {
                    console.log("error api fetch @ booking history: ")
                    console.log(err)
                    setIsBookingloaded(true);
                })
        }

        if (loginState)
            fetchBookingHistory();
        else
            setBookingDetails("");

    }, [loginState]);

    // console.log(bookingDetails)

    return (
        <div className="container mt-2">
            {loginState &&
                <>

                    {(!isBookingLoaded) ? <Loader /> :

                        <div className="card bg-light p-2">

                            {bookingDetails.status ?

                                <div className="row singleInnerContainerDiv1">

                                    <small className="bg-success text-light">{`OrderID: ${bookingDetails.razorpayOrderId},  Date: ${new Date(bookingDetails.date).toLocaleString()}`}</small>

                                    <div className="col-lg-8 col-md-10 col-12 my-2">
                                        <div className="row">
                                            <strong>{bookingDetails.bookingData.bookingItems.eventName}</strong>
                                            <h6>{`Date : ${bookingDetails.bookingData.bookingItems.eventDate}`}</h6>
                                            <h6>{`Time : ${bookingDetails.bookingData.bookingItems.eventTime}`}</h6>
                                            <h6>{`Type : ${bookingDetails.bookingData.bookingItems.onstage ? "On-stage Event" : bookingDetails.bookingData.bookingItems.openstage ? "Open-stage Event" : null}`}</h6>
                                            <strong>Contact Address</strong>
                                            <small>{`Name  : ${bookingDetails.bookingData.contactData.fName} ${bookingDetails.bookingData.contactData.lName}`}</small>
                                            <small>{`Place : ${bookingDetails.bookingData.contactData.place}, ${bookingDetails.bookingData.contactData.district} dist.`}</small>
                                            <small>{`Phone : ${bookingDetails.bookingData.contactData.phone}`}</small>
                                            <small>{`Email : ${bookingDetails.bookingData.contactData.email}`}</small>
                                            <strong>Billing Address</strong>
                                            <small>{`Name  : ${bookingDetails.bookingData.contactData.billingfName} ${bookingDetails.bookingData.contactData.billinglName}`}</small>
                                            <small>{`Place : ${bookingDetails.bookingData.contactData.billingplace}, ${bookingDetails.bookingData.contactData.billingdistrict} dist.`}</small>
                                            <small>{`Phone : ${bookingDetails.bookingData.contactData.billingphone}`}</small>
                                            <small>{`Email : ${bookingDetails.bookingData.contactData.billingemail}`}</small>
                                        </div>

                                        < strong >Requirements</strong>
                                        {bookingDetails.pasystem && <p>{`PA Wattage: ${bookingDetails.pawattage}`}</p>}

                                        {
                                            CatogoryArr.map((cat, ind) => {
                                                let filteredArr;
                                                filteredArr = bookingDetails.bookingData.bookingItems.items.filter(e => (e.category === cat))
                                                return (
                                                    <div key={ind}>
                                                        {
                                                            (filteredArr.length > 0) && <>
                                                                <h6>{cat}</h6>
                                                                <table className='singleHistoryTableCls'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="singleRowCenter">Sl.No</th>
                                                                            <th className="singleRowCenter">Item</th>
                                                                            <th className="singleRowCenter">Qty</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {
                                                                        filteredArr.map((item, index) => {
                                                                            return (
                                                                                <tbody key={index}>
                                                                                    <tr >
                                                                                        <td className="singleRowCenter">{index + 1}</td>
                                                                                        <td className="singleRowCenter">{item.subCategory}</td>
                                                                                        <td className="singleRowCenter">{item.qty}</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            )
                                                                        })}
                                                                </table>
                                                            </>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className='row'>
                                            < strong >Comments</strong>
                                            <h6>{bookingDetails.bookingData.bookingItems.comments}</h6>
                                        </div>

                                        <div className='row'>
                                            < strong >Payment Details</strong>
                                            <small className="text-primary">{`Type: ${bookingDetails.paymentType}`}</small>
                                            <small className="text-success">{`Status: payment_success`}</small>
                                            <small className="historyPriceTag">{`Paid Amount: Rs.${bookingDetails.amount}/-`}</small>
                                            <small>{`Paymant Id: ${bookingDetails.razorpayPaymentId}`}</small>
                                            <small>{`Signature: ${bookingDetails.razorpaySignature}`}</small>
                                            {bookingDetails.paymentType === "Advance Payment" && <strong className="text-danger">{`To be paid: Rs.${bookingDetails.amount * 3}`} </strong>}
                                        </div>

                                    </div>
                                </div>

                                :

                                <div className="row singleInnerContainerDiv1">

                                    <small className="bg-danger text-light">{`OrderID: ${bookingDetails.order_id},  Date: ${new Date(bookingDetails.date).toLocaleString()}`}</small>

                                    <div className="col-lg-8 col-md-10 col-12 my-2">
                                        <div className="row">
                                            <strong>{bookingDetails.bookingData.bookingItems.eventName}</strong>
                                            <h6>{`Date : ${bookingDetails.bookingData.bookingItems.eventDate}`}</h6>
                                            <h6>{`Time : ${bookingDetails.bookingData.bookingItems.eventTime}`}</h6>
                                            <h6>{`Type : ${bookingDetails.bookingData.bookingItems.onstage ? "On-stage Event" : bookingDetails.bookingData.bookingItems.openstage ? "Open-stage Event" : null}`}</h6>
                                            <strong>Contact Address</strong>
                                            <small>{`Name  : ${bookingDetails.bookingData.contactData.fName} ${bookingDetails.bookingData.contactData.lName}`}</small>
                                            <small>{`Place : ${bookingDetails.bookingData.contactData.place}, ${bookingDetails.bookingData.contactData.district} dist.`}</small>
                                            <small>{`Phone : ${bookingDetails.bookingData.contactData.phone}`}</small>
                                            <small>{`Email : ${bookingDetails.bookingData.contactData.email}`}</small>
                                            <strong>Billing Address</strong>
                                            <small>{`Name  : ${bookingDetails.bookingData.contactData.billingfName} ${bookingDetails.bookingData.contactData.billinglName}`}</small>
                                            <small>{`Place : ${bookingDetails.bookingData.contactData.billingplace}, ${bookingDetails.bookingData.contactData.billingdistrict} dist.`}</small>
                                            <small>{`Phone : ${bookingDetails.bookingData.contactData.billingphone}`}</small>
                                            <small>{`Email : ${bookingDetails.bookingData.contactData.billingemail}`}</small>
                                        </div>

                                        <p>< strong >Requirements</strong></p>
                                        {bookingDetails.pasystem && <small>{`PA Wattage: ${bookingDetails.pawattage}`}</small>}

                                        {
                                            CatogoryArr.map((cat, inde) => {
                                                let filteredArr;
                                                filteredArr = bookingDetails.bookingData.bookingItems.items.filter(e => (e.category === cat))
                                                return (
                                                    <div key={inde}>
                                                        {
                                                            (filteredArr.length > 0) && <>
                                                                <h6>{cat}</h6>
                                                                <table className='singleHistoryTableCls'>
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="singleRowCenter">Sl.No</th>
                                                                            <th className="singleRowCenter">Item</th>
                                                                            <th className="singleRowCenter">Qty</th>
                                                                        </tr>
                                                                    </thead>
                                                                    {
                                                                        filteredArr.map((item, index) => {
                                                                            return (
                                                                                <tbody key={index}>
                                                                                    <tr >
                                                                                        <td className="singleRowCenter">{index + 1}</td>
                                                                                        <td className="singleRowCenter">{item.subCategory}</td>
                                                                                        <td className="singleRowCenter">{item.qty}</td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            )
                                                                        })}
                                                                </table>
                                                            </>
                                                        }
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className='row'>
                                            < strong >Comments</strong>
                                            <h6>{bookingDetails.bookingData.bookingItems.comments}</h6>
                                        </div>

                                        <div className='row'>
                                            < strong >Payment Details</strong>
                                            <small className="text-primary">{`Type: ${bookingDetails.paymentType}`}</small>
                                            <small className="text-danger">{`Status: ${bookingDetails.reason}`}</small>
                                            <small>{`Status: ${bookingDetails.description}`}</small>
                                            <small className="historyPriceTag">{`Amount: Rs.${bookingDetails.amount}/-`}</small>
                                            <small>{`Paymant Id: ${bookingDetails.razorpayPaymentId}`}</small>
                                            {bookingDetails.paymentType === "Advance Payment" && <strong className="text-danger">{`To be paid: Rs.${bookingDetails.amount * 3}`} </strong>}
                                        </div>

                                    </div>
                                </div>
                            }
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Singlehistory
