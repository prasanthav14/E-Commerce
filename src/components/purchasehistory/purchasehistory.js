import React, { useState, useEffect } from 'react';
import './purchasehistory.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Loader from "../loader/loader.js";
import { userStore } from '../../zustand/store';

function Purchsehistory() {

    const [isPurchaseLoaded, setIsPurchaseloaded] = useState(false);
    const [isPurchaseHistoryEmpty, setIsPurchaseHistoryEmpty] = useState(true);

    const [isBookingLoaded, setIsBookingloaded] = useState(false);
    const [isBookingHistoryEmpty, setIsBookingHistoryEmpty] = useState(true);

    const [isPurchaseItemsLoaded, setIsPurchaseItemsLoaded] = useState(false);

    const Navigate = useNavigate();

    const userData = userStore(state => state.user.data);
    const loginState = userStore(state => state.user.loginState);

    const [purchaseData, setPurchaseData] = useState([]);
    const [purchaseItems, setPurchaseItems] = useState([]);

    const [bookingDetails, setBookingDetails] = useState([]);

    const { bookorpurchase } = useParams();
    const [selector, setSelector] = useState("booking");

    useEffect(() => {
        setSelector(bookorpurchase);
        // console.log(bookorpurchase);
    }, []);

    useEffect(() => {

        const fetchPurchaseHistory = () => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER_URL}/purchasehistory/gethistory`,
                data: { entrySelect: "email", entry: userData.email },
                responseType: 'json',
            })
                .then((resp) => {
                    // if (resp.status === 200) {
                        // console.log("fetched purchase history");
                        const tempObj = resp.data;
                        setPurchaseData(prev => [...tempObj])
                        setIsPurchaseloaded(true); //cm
                    // }
                    // else {
                    //     console.log("error api fetch @ purchase history: ")
                    //     console.log(resp.status + " : " + resp.statusText)
                    //     setIsPurchaseloaded(true); //cd
                    // }
                })
                .catch(err => {
                    console.log("error api fetch @ purchase history: ")
                    console.log(err)
                    setIsPurchaseloaded(true); //cm
                })
        }
        if (loginState)
            fetchPurchaseHistory();
        else
            setPurchaseData([]);

    }, [loginState])


    useEffect(() => {
        if (purchaseData.length > 0) {
            const cartDataRef = [];
            purchaseData.map(ele => {
                ele.cart.map(e => {
                    cartDataRef.push(e.id)
                    return (null)
                })
                return (null)
            })

            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER_URL}/cart/readcart`,
                data: { ids: [...new Set(cartDataRef)] },
                responseType: 'json',
            })
                .then((resp) => {
                    // if (resp.status === 200) {
                    //     console.log("data transfer success @ cart");
                        // console.log(resp.data);
                        setPurchaseItems(resp.data)
                        // setIsPurchaseloaded(true);
                        setIsPurchaseItemsLoaded(true);
                    // }
                    // else {
                    //     console.log("error api fetch history items: ")
                    //     console.log(resp.statusText);
                    //     // setIsPurchaseloaded(true);
                    //     setIsPurchaseItemsLoaded(true);
                    // }
                })
                .catch(err => {
                    console.log("error api fetch history items: ");
                    console.log(err);
                    // setIsPurchaseloaded(true);
                    setIsPurchaseItemsLoaded(true);
                })
        }
    }, [purchaseData])

    useEffect(() => {
        if (purchaseItems.length > 0) {
            let tempData = [];
            purchaseData.map(e => {
                let tempCart = [];
                e.cart.map(ele => {
                    tempCart.push(purchaseItems.filter(elem => (elem.refId === ele.id))[0])
                    return (null);
                })
                tempData.push({ ...e, cart: tempCart });
                return (null);
            })
            // console.log(tempData);
            setPurchaseData([...tempData]);
            setIsPurchaseItemsLoaded(true);
        }
    }, [purchaseItems])

    // console.log(purchaseData)
    // console.log(purchaseItems)
    // console.log(bookingDetails)

    useEffect(() => {

        const fetchBookingHistory = () => {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_SERVER_URL}/purchasehistory/getbookinghistory`,
                data: { entrySelect: "email", entry: userData.email },
                responseType: 'json',
            })
                .then((resp) => {
                    // if (resp.status === 200) {
                    //     console.log("fetched booking history");
                        const tempObj = resp.data;
                        setBookingDetails(prev => [...tempObj])
                        setIsBookingloaded(true);
                    // }
                    // else {
                    //     console.log("error api fetch @ booking history: ")
                    //     console.log(resp.status + " : " + resp.statusText)
                    //     setIsBookingloaded(true);
                    // }
                })
                .catch(err => {
                    console.log("error api fetch @ booking history: ");
                    console.log(err);
                    setIsBookingloaded(true);
                })
        }
        if (loginState)
            fetchBookingHistory();
        else
            setBookingDetails([]);

    }, [loginState])

    useEffect(() => {
        if (purchaseData.length > 0) { setIsPurchaseHistoryEmpty(false); }
        else { setIsPurchaseHistoryEmpty(true); }
    }, [purchaseData]);

    useEffect(() => {
        if (bookingDetails.length > 0) { setIsBookingHistoryEmpty(false); }
        else { setIsBookingHistoryEmpty(true); }
    }, [bookingDetails]);


    const handleClick = (key) => {
        Navigate(`/singlehistory/${key}`)
    }

    return (
        <>

            <div className="mt-2">
                <div className=" bg-dark text-center">
                    <h1 className="text-light">{selector === "purchase" ? "Purchase History" : selector === "booking" ? "Booking History" : null} </h1>
                </div>
            </div>

            <div className="bg-light mt-2 d-flex">
                <div className="col-6 bg-primary" style={{ textAlign: "center" }}>
                    <button onClick={() => { setSelector("purchase") }} type='button' className='btn btn-sm btn-primary filterBtnCls'>Purchase</button>
                </div>
                <div className="col-6 bg-warning" style={{ textAlign: "center" }}>
                    <button onClick={() => { setSelector("booking") }} type='button' className='btn btn-sm btn-warning filterBtnCls'>Booking</button>
                </div>

            </div>

            {selector === "booking" ?
                <>
                    {loginState &&
                        <section>

                            {!isBookingLoaded ? <Loader /> :

                                <>
                                    {/* {!(bookingDetails.length > 0) ? */}
                                    {isBookingHistoryEmpty ?

                                        <div className="emptyCart">
                                            <h1>Your booking history is empty!</h1>
                                            <button onClick={() => { Navigate("/booking") }} className="btm btn-sm btn-primary">Book for an event</button>
                                        </div>
                                        :
                                        <div className="container">
                                            <div className='row containerDiv'>

                                                {bookingDetails.map((ele, ind) => {

                                                    return (
                                                        ele.status ?

                                                            <div key={ind} onClick={() => { handleClick(ele.razorpayOrderId) }} className="row historyContainerDiv">

                                                                <small className="bg-success text-light">{`id: ${ele.razorpayOrderId}, dt: ${new Date(ele.date).toLocaleString()}`}</small>

                                                                <div className="col-lg-4 col-md-5 col-6">
                                                                    <div className="historyInnerContainer">
                                                                        <h6><strong>{ele.bookingData.bookingItems.eventName}</strong></h6>
                                                                        <h6><small>{`Date: ${ele.bookingData.bookingItems.eventDate}`}</small></h6>
                                                                        <h6><small>{`Time: ${ele.bookingData.bookingItems.eventTime}`}</small></h6>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-4 col-md-5 col-6">
                                                                    <div className="historyInnerContainer">
                                                                        <h6><small className="fw-bold muted">{`${ele.paymentType}`}</small></h6>
                                                                        <h6><small className="text-success">{`Status: payment_success`}</small></h6>
                                                                        <h6><small className="bookingHistoryPriceTag">Total: {`Rs. ${ele.amount}/-`}</small></h6>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            :

                                                            <div key={ind} onClick={() => { handleClick(ele.order_id) }} className="row historyContainerDiv">

                                                                <small className="bg-danger text-light">{`id: ${ele.order_id}, Dt: ${new Date(ele.date).toLocaleString()}`}</small>

                                                                <div className="col-lg-4 col-md-5 col-6">
                                                                    <div className="historyInnerContainer">
                                                                        <h6><strong>{ele.bookingData.bookingItems.eventName}</strong></h6>
                                                                        <h6><small>{`Date: ${ele.bookingData.bookingItems.eventDate}`}</small></h6>
                                                                        <h6><small>{`Time: ${ele.bookingData.bookingItems.eventTime}`}</small></h6>
                                                                    </div>
                                                                </div>

                                                                <div className="col-lg-4 col-md-5 col-6">
                                                                    <div className="historyInnerContainer">
                                                                        <h6><small className="fw-bold muted">{`${ele.paymentType}`}</small></h6>
                                                                        <h6><small className="text-danger">{`Status: ${ele.reason}`}</small></h6>
                                                                        {/* <h6><small>{`Description: ${ele.description}`}</small></h6> */}
                                                                        <h6><small className="bookingHistoryPriceTag">{`Amount: ${ele.amount}/-`}</small></h6>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                    )
                                                })
                                                }
                                            </div>
                                        </div>
                                    }
                                </>
                            }
                        </section >
                    }

                </>

                : selector === "purchase" ?
                    <>
                        {
                            loginState &&

                            <section>
                                {!isPurchaseLoaded ? <Loader /> :

                                    <>
                                        {isPurchaseHistoryEmpty ?

                                            <div className="emptyCart">
                                                <h1>Your purchase history is empty!</h1>
                                                <button onClick={() => { Navigate("/rent") }} className="btm btn-sm btn-primary">Go Shopping</button>
                                            </div>
                                            :
                                            <div className="container">
                                                <div className="row containerDiv">

                                                    {purchaseData.map((ele, ind) => {

                                                        return (ele.status ?

                                                            <div key={ind} className="row innerContainerDiv1">

                                                                <small className="bg-success text-light mt-1">{`OrderID: ${ele.razorpayOrderId},  Date: ${new Date(ele.date).toLocaleString()}`}</small>
                                                                {
                                                                    isPurchaseItemsLoaded &&
                                                                    <>

                                                                        {ele.cart.map((Item, index) => {
                                                                            return (
                                                                                <div key={index} className="row bg-light innerContainerDiv2" >

                                                                                    <div className="col-lg-3 col-md-3 col-6 historyImgDiv ">
                                                                                        <img className="img-thumbnail" style={{ height: "100%" }} alt={Item.modelName} src={Item.imageUrl} />
                                                                                    </div>

                                                                                    <div className="col-lg-4 col-md-4 col-6">
                                                                                        <div className="row">
                                                                                            <h5>{`${Item.brand} - ${Item.modelName}`}</h5>
                                                                                            <h6>{`Catergory: ${Item.subCategory}`}</h6>
                                                                                        </div>

                                                                                    </div>
                                                                                    {(index === 0) &&
                                                                                        <div className="col-lg-5 col-md-5 col-12">
                                                                                            <div className="row">
                                                                                                <small className="fw-bold muted">{`${ele.paymentType}`}</small>
                                                                                                <small className="text-success">{`Status: payment_success`}</small>
                                                                                                <small className="historyPriceTag">{`Total: Rs.${ele.amount}/-`}</small>
                                                                                            </div>
                                                                                        </div>
                                                                                    }

                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </>
                                                                }
                                                            </div>
                                                            :
                                                            <div key={ind} className="row innerContainerDiv1">

                                                                <small className="bg-danger text-light mt-1">{`OrderID: ${ele.order_id},  Date: ${new Date(ele.date).toLocaleString()}`}</small>
                                                                {
                                                                    isPurchaseItemsLoaded &&
                                                                    <>

                                                                        {ele.cart.map((Item, index) => {
                                                                            return (
                                                                                <div key={index} className="row bg-light innerContainerDiv2" >

                                                                                    <div className="col-lg-3 col-md-3 col-6 historyImgDiv ">
                                                                                        <img className="img-thumbnail" style={{ height: "100%" }} alt={Item.modelName} src={Item.imageUrl} />
                                                                                    </div>

                                                                                    <div className="col-lg-4 col-md-4 col-6">
                                                                                        <div className="row">
                                                                                            <h5>{`${Item.brand} - ${Item.modelName}`}</h5>
                                                                                            <h6>{`Catergory: ${Item.subCategory}`}</h6>
                                                                                        </div>

                                                                                    </div>
                                                                                    {(index === 0) &&
                                                                                        <div className="col-lg-5 col-md-5 col-12">
                                                                                            <div className="row">
                                                                                                <small className="fw-bold muted">{`type: ${ele.paymentType}`}</small>
                                                                                                <small className="text-danger">{`Status: ${ele.reason}`}</small>
                                                                                                <small>{`Description: ${ele.description}`}</small>
                                                                                                <small className="historyPriceTag">{`Total: Rs.${ele.amount}/-`}</small>
                                                                                            </div>
                                                                                        </div>
                                                                                    }


                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                    }

                                                </div>
                                            </div>

                                        }
                                    </>

                                }
                            </section >
                        }

                    </> : null
            }

        </>
    )
}

export default Purchsehistory;