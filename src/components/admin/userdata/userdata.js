import React, { useEffect, useState } from 'react';
import './userdata.css';

import Loader from "../../loader/loader.js";
import { adminStore } from '../../../zustand/store';

import { useNavigate } from 'react-router-dom';
import axios from "axios"

function UserData() {

    const Navigate = useNavigate();

    const [allUsers, setAllUsers] = useState([]);
    const [isUsersLoaded, setIsUsersLoaded] = useState(false);

    const [isPurchaseLoaded, setIsPurchaseloaded] = useState(false);
    const [isPurchaseHistoryEmpty, setIsPurchaseHistoryEmpty] = useState(false);

    const [isBookingLoaded, setIsBookingloaded] = useState(false);
    const [isBookingHistoryEmpty, setIsBookingHistoryEmpty] = useState(false);

    const [isPurchaseItemsLoaded, setIsPurchaseItemsLoaded] = useState(false);

    const [isSubmitted, setIsSubmitted] = useState(false);

    const [purchaseData, setPurchaseData] = useState([]);
    const [purchaseItems, setPurchaseItems] = useState([]);

    const [bookingDetails, setBookingDetails] = useState([]);

    const adminGlobalState = adminStore(state => state.adminGlobalState);

    const [entrySelect, setEntrySelect] = useState("date");
    const [entry, setEntry] = useState("");

    const [hideSubmit, setHideSubmit] = useState(false);
    // const [errorItem, setErrorItem] = useState("");

    const formatDate = (daysBefore) => {

        const d = new Date(new Date().getTime() - daysBefore * 24 * 60 * 60 * 1000)
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const maxDate = formatDate(0);


    useEffect(() => {

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}/auth/allusers`,
            withCredentials: true,
            responseType: 'json'
        })
            .then((resp) => {
                // if (resp.status === 200) {
                    // console.log("all users fetched")
                    // console.log(resp)
                    setAllUsers(resp.data)
                    setIsUsersLoaded(true)
                // }
                // else {
                //     console.log(resp.status + " : " + resp.statusText)
                //     setIsUsersLoaded(false)
                // }
            })
            .catch(err => {
                console.log("error api fetch: ");
                console.log(err);
                setIsUsersLoaded(false)
            })

    }, [])
    

    const handleSubmit = (event) => {

        event.preventDefault();
        setHideSubmit(true);
        setTimeout(() => { setHideSubmit(false) }, 1000);

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/purchasehistory/gethistory`,
            data: { entrySelect: entrySelect, entry: entry },
            responseType: 'json',
        })
            .then((resp) => {
                // if (resp.status === 200) {
                    console.log("fetched purchase history");
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
                console.log("error api fetch @ purchase history: ");
                console.log(err);
                setIsPurchaseloaded(true); //cm
            })


        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/purchasehistory/getbookinghistory`,
            data: { entrySelect: entrySelect, entry: entry },
            responseType: 'json',
        })
            .then((resp) => {
                // if (resp.status === 200) {
                    console.log("fetched booking history");
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
                console.log("error api fetch @ booking history: ")
                console.log(err);
                setIsBookingloaded(true);
            })

        setIsSubmitted(true);

    }

    useEffect(() => {
        if (purchaseData.length > 0) {
            setIsPurchaseHistoryEmpty(false);
        }
        else {
            setIsPurchaseHistoryEmpty(true);
        }

    }, [purchaseData]);

    useEffect(() => {
        if (bookingDetails.length > 0) {
            setIsBookingHistoryEmpty(false);
        }
        else {
            setIsBookingHistoryEmpty(true);
        }
    }, [bookingDetails]);

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
                        // console.log("data transfer success @ cart");
                        // console.log(resp.data);
                        setPurchaseItems(prev => [...resp.data])
                        // setIsPurchaseloaded(true);
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


    const handleClick = (key) => {
        Navigate(`/singlehistory/${key}`)
    }

    const handleChange = (event) => {
        setEntrySelect(event.target.value);
        setEntry("");
        setIsSubmitted(false)
    }

    // console.log(purchaseData);
    // console.log(purchaseItems);

    return (
        <>
            <div className="container">
                {(isUsersLoaded) &&
                    <div className="row bg-light py-4 px-1">

                        <div className="row my-1 text-left">
                            {/* <h2 >{ selector.addItem === true ? "Add Item" : selector.userData === true ? "User Data" : selector.addAdmin === true ? "Add Admin" : null }</h2> */}
                            <h2>{adminGlobalState}</h2>
                            <hr />
                        </div>

                        <div className="col-lg-6 col-md-8 col-12 my-1 adminInnerContainer1">
                            <div className="row">
                                <h3>Users List</h3>
                            </div>

                            <table className='allUsersTableCls'>
                                <thead>
                                    <tr>
                                        <th className="allUsersRowCenter">Sl.No</th>
                                        <th className="allUsersRowCenter">F Name</th>
                                        <th className="allUsersRowCenter">L Name</th>
                                        <th className="allUsersRowCenter">Email</th>
                                        <th className="allUsersRowCenter">Adm</th>
                                    </tr>
                                </thead>
                                {
                                    allUsers.map((user, index) => {
                                        return (
                                            <tbody key={index}>
                                                <tr>
                                                    <td className="allUsersRowCenter"><small>{index + 1}</small></td>
                                                    <td className="allUsersRowCenter"><small>{user.fName}</small></td>
                                                    <td className="allUsersRowCenter"><small>{user.lName}</small></td>
                                                    <td className="allUsersRowCenter"><small>{user.email}</small></td>
                                                    <td className="allUsersRowCenter"><small>{user.isAdmin?"T":"F"}</small></td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                }
                            </table>
                        </div>

                        <div className="row mt-2">
                            <h3>Purchase/Booking Data</h3>
                        </div>

                        <form onSubmit={handleSubmit} method="POST">
                            <div className='row'>
                                <div className="col-lg-3 col-md-4 col-6 ">
                                    <select onChange={handleChange} className="form-select" aria-label="select the entry">
                                        <option value='date'>Date</option>
                                        <option value='email'>Email</option>
                                    </select>
                                </div>

                                <div className="col-lg-3 col-md-4 col-6">
                                    {entrySelect === "email" ? <input type="email" required onChange={(event) => { setEntry(event.target.value) }} value={entry} className="form-control" name="emailEntry" id="emailEntry" placeholder="Enter the user email..." />
                                        : entrySelect === "date" ? <input type="date" required max={maxDate} onChange={(event) => { setEntry(event.target.value) }} value={entry} className="form-control" name="dateEntry" id="dateEntry" placeholder="Select the date..." /> : null}
                                </div>
                            </div>

                            <button disabled={hideSubmit} className="btn btn-sm btn-primary my-2" type="submit" id="button-addon2">Submit</button>

                        </form>


                        <div className="row">
                            <div className="mt-2 mb-1">
                                <>
                                    {isSubmitted &&
                                        <section>
                                            {!isPurchaseLoaded ? <Loader /> :
                                                <>
                                                    {isPurchaseHistoryEmpty ?

                                                        <div className="userHistoryEmptyCart">
                                                            <h1>No purchase data!</h1>
                                                        </div>

                                                        :

                                                        <div className="row containerDiv">

                                                            <div className="row mt-2">
                                                                <h4>Purchase Data</h4>
                                                            </div>

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
                                                                                                        <small className="text-success">{`ID:${ele.razorpayPaymentId}`}</small>
                                                                                                        {/* <small className="text-success">{`Signature: ${ele.razorpaySignature}`}</small> */}
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
                                                    }
                                                </>
                                            }
                                        </section >
                                    }
                                </>

                                <>
                                    {isSubmitted &&
                                        <>
                                            {!isBookingLoaded ? <Loader /> :

                                                <section>
                                                    {isBookingHistoryEmpty ?
                                                        <div className="userHistoryEmptyCart">
                                                            <h1>No booking data!</h1>
                                                        </div>

                                                        :

                                                        <div className='row containerDiv'>

                                                            <div className="row  mt-2">
                                                                <h4>Booking Data</h4>
                                                            </div>

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
                                                    }
                                                </section >
                                            }
                                        </>
                                    }
                                </>
                            </div>
                        </div>
                    </div >
                }
            </div>
        </>
    );
}

export default UserData;
