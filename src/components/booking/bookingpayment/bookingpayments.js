import React, { useEffect } from "react";
import "./bookingpayments.css"
import { useNavigate } from 'react-router-dom';
import { userStore, bookingDataStore, bookingStore } from '../../../zustand/store';
import axios from "axios";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Bookingpayments() {

    const bookingData = bookingDataStore(state => state.bookingData);

    const setGlobalState = bookingStore(state => state.setGlobalState);
    const bookingGlobalState = bookingDataStore(state => state.bookingGlobalState);

    const userData = userStore(state => state.user.data);
    const loginState = userStore(state => state.user.loginState);

    const CatogoryArr = ["PA System", "Illuminary", "Power System"]

    const Navigate = useNavigate();

    useEffect(() => {
        // console.log(bookingGlobalState);
        // console.log(bookingData);
    }, [bookingData, bookingGlobalState])

    function handleCheckout(paymentType, total, bookingData) {
        if (loginState) {
            axios({
                method: "post",
                url: `${process.env.REACT_APP_SERVER_URL}/pay/booking`,
                data: { amount: total }
            }).then(resp => {
                // console.log(resp);

                const options = {
                    "key": `${process.env.REACT_APP_RAZOR_KEY}`, // Enter the Key ID generated from the Dashboard
                    "amount": total, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "AV Event Solutions",
                    "description": "Payment agianst item rental",
                    "image": `${process.env.PUBLIC_URL}/img/avlogoed.png`,
                    "order_id": resp.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "prefill": {
                        "name": `${userData.fName} ${userData.lName}`,
                        "email": userData.email,
                        "contact": ""
                    },
                    "notes": {
                        "ItemDetails": JSON.stringify(bookingData)
                    },
                    "theme": { "color": "#F05151" },
                    "timeout": 180,
                    "readonly": { contact: "false", email: "true", name: "true" },
                    "config": {    // sequence: ["block.hdfc", "block.other"],
                        preferences: {
                            show_default_blocks: true // Should Checkout show its default blocks?
                            // },
                        }
                    },
                    "handler": async function (response) {
                        const data = {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature,
                            razorpayPaymentId: response.razorpay_payment_id
                        };
                        // console.log(response)
                        await axios({
                            method: "post",
                            url: `${process.env.REACT_APP_SERVER_URL}/pay/bookingpaymentstatus`,
                            data: { status: true, ...data, date: new Date().toUTCString(), email: userData.email, bookingData: bookingData, amount: total, paymentType: paymentType }
                        }).then(response => {
                            alert("Payment Success");
                            toast.success("Payment Success", {
                                onClose: () => {
                                    // console.log(response);
                                    Navigate("/history/booking");
                                    setGlobalState("personal");
                                }
                            });
                        })
                    },
                };
                // console.log(options);

                // redirect: "",
                // callback_url: "",

                const paymentObject = new window.Razorpay(options);

                paymentObject.on('payment.failed', async function (response) {
                    // console.log(response)
                    const data = {
                        // code: response.error,
                        description: response.error.description,
                        // source: response.error,
                        // step: response.error,
                        reason: response.error.reason,
                        order_id: response.error.metadata.order_id,
                        razorpayPaymentId: response.error.metadata.payment_id
                    };

                    await axios({
                        method: "post",
                        url: `${process.env.REACT_APP_SERVER_URL}/pay/bookingpaymentstatus`,
                        data: { status: false, ...data, date: new Date().toUTCString(), email: userData.email, bookingData: bookingData, amount: total, paymentType: paymentType }
                    }).then(response => {
                        alert(`Payment Failed-${data.description}`);
                        toast.error(`Payment Failed-${data.description}`, {
                            onClose: () => {
                                // console.log(response)
                            }
                        });
                    })
                });

                paymentObject.open();
            })
        }
        else
            Navigate("/login");
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };

    useEffect(() => {
        loadScript(`${process.env.REACT_APP_RAZOR_SCRIPT}`);
    }, []);

    return (
        <div className='container bg-secondary py-2'>

            <div className="row bookingPreviewContainerDiv1 mb-1 bg-light">

                <h3 className="card-title mt-3">Preview - Booking details</h3>
                <hr/>

                <div className="col-lg-8 col-md-10 col-12 my-2">
                    <div className="row">
                        <strong>{bookingData.bookingItems.eventName}</strong>
                        <h6>{`Date : ${bookingData.bookingItems.eventDate}`}</h6>
                        <h6>{`Time : ${bookingData.bookingItems.eventTime}`}</h6>
                        <h6>{`Type : ${bookingData.bookingItems.onstage ? "On-stage Event" : bookingData.bookingItems.openstage ? "Open-stage Event" : null}`}</h6>
                        <strong>Contact Address</strong>
                        <small>{`Name  : ${bookingData.contactData.fName} ${bookingData.contactData.lName}`}</small>
                        <small>{`Place : ${bookingData.contactData.place}, ${bookingData.contactData.district} dist.`}</small>
                        <small>{`Phone : ${bookingData.contactData.phone}`}</small>
                        <small>{`Email : ${bookingData.contactData.email}`}</small>
                        <strong>Billing Address</strong>
                        <small>{`Name  : ${bookingData.contactData.billingfName} ${bookingData.contactData.billinglName}`}</small>
                        <small>{`Place : ${bookingData.contactData.billingplace}, ${bookingData.contactData.billingdistrict} dist.`}</small>
                        <small>{`Phone : ${bookingData.contactData.billingphone}`}</small>
                        <small>{`Email : ${bookingData.contactData.billingemail}`}</small>
                    </div>

                    <strong >Requirements</strong>
                    {bookingData.bookingItems.pasystem && <p>{`PA Wattage: ${bookingData.bookingItems.pawattage}`}</p>}

                    {
                        CatogoryArr.map((cat, ind) => {
                            let filteredArr;
                            filteredArr = bookingData.bookingItems.items.filter(e => (e.category === cat))
                            return (
                                <div key={ind}>
                                    {
                                        (filteredArr.length > 0) && <>
                                            <h6>{cat}</h6>
                                            <table className='bookingPreviewTableCls'>
                                                <thead>
                                                    <tr>
                                                        <th className="bookingPreviewRowCenter">Sl.No</th>
                                                        <th className="bookingPreviewRowCenter">Item</th>
                                                        <th className="bookingPreviewRowCenter">Qty</th>
                                                    </tr>
                                                </thead>
                                                {
                                                    filteredArr.map((item, index) => {
                                                        return (
                                                            <tbody key={index}>
                                                                <tr >
                                                                    <td className="bookingPreviewRowCenter">{index + 1}</td>
                                                                    <td className="bookingPreviewRowCenter">{item.subCategory}</td>
                                                                    <td className="bookingPreviewRowCenter">{item.qty}</td>
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
                        <h6>{bookingData.bookingItems.comments}</h6>
                    </div>

                </div>
            </div>


            <div className='col-lg-12 col-md-12 col-12 mt-1 mx-auto checkoutCls'>

                <div className="row card mx-auto" >
                    <div className="card-body">
                        <h5 className="card-title">Sub Total</h5>
                        <p className="card-text justify-content-center">You can proceed by paying the Total amout or the advance.</p>
                        <div>
                            <label htmlFor='total'>Total Amount <small className="text-success">{` (*Inc. all taxes)`}</small></label>
                            <p id='total' className="priceTag fst-italic">{`Rs.${bookingData.amount}/-`}</p>
                            <label htmlFor='advance'>Advance Amount</label>
                            <p id="advance" className="priceTag fst-italic">{`Rs.${bookingData.amount * .25}/-`}</p>
                            <small className="text-success">{`* In advance payment, rest of the rent (Rs.${bookingData.amount * .75}/-) has to be settled after the program.`}</small>
                            <div className='mt-2'>
                                <button onClick={() => { handleCheckout("Full Payment", bookingData.amount, bookingData) }} className="btn btn-sm btn-primary">Pay Total</button>
                                <button onClick={() => { handleCheckout("Advance Payment", bookingData.amount * .25, bookingData) }} className="btn btn-sm btn-primary ms-2 ">Pay Advance</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bookingpayments;