import React, { useState, useEffect, useRef } from 'react';
import './cart.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from "../loader/loader.js";
// import GooglePayButton from "@google-pay/button-react";
import cartCountStore from '../../zustand/store';
import { userStore } from '../../zustand/store';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {

    const [cartData, setCartData] = useState([]);
    const [isLoaded, setIsloaded] = useState(false);
    const [isCartEmpty, setIsCartEmpty] = useState(false);
    const Navigate = useNavigate();
    const category = ["paSystem", "illuminary", "powerSystem"];
    const [cartRefresh, setcartRefresh] = useState(false);
    const qtyRef = useRef(1);
    const totalRef = useRef(0);
    const [storageData, setStorageData] = useState([]);

    const cartCount = cartCountStore(state => state.cartCount);
    const userData = userStore(state => state.user.data);
    const loginState = userStore(state => state.user.loginState);


    useEffect(() => {

        const cartDataRef = [];
        // const cartQtyRef = [];
        if (localStorage.getItem("item")) {
            const localData = JSON.parse(localStorage.getItem("item"));
            setStorageData(localData);
            // console.log("..................tempObj");
            // console.log(tempObj);

            localData.map(e => {

                cartDataRef.push(e.id);
                // cartQtyRef.push(e.qty)
                return (null);
            })
            setIsCartEmpty(false);
        }
        else {
            setIsCartEmpty(true);
            // console.log("cart Empty")
        }

        // console.log(cartDataRef);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/cart/readcart`,
            data: { ids: cartDataRef },
            responseType: 'json',
        })
            .then((resp) => {
                // if (resp.status === 200) {
                // console.log("data transfer success @ cart");
                // console.log(resp.data);
                const tempObj = [...resp.data]
                const localData = JSON.parse(localStorage.getItem("item"));
                tempObj.map((e, index) => {

                    // if (localStorage.getItem("e.refId")) {
                    tempObj[index].quantity = parseInt(localData.filter(ele => (ele.id === e.refId))[0].qty);
                    // console.log("localif");
                    // }
                    // else {
                    // tempObj[index].quantity = 1
                    // console.log("localelse");
                    // }
                    return (null);
                })
                // console.log(tempObj);
                setCartData(tempObj);
                setIsloaded(true);

                // }
                // else {
                //     console.log(resp.status + " : " + resp.statusText)
                //     setIsloaded(false);
                //     Navigate(-1);
                // }
            })
            .catch(err => {
                console.log("error api fetch @ cart: ");
                console.log(err);
                setIsloaded(false);
                Navigate(-1);
            })

    }, [cartRefresh]);

    useEffect(() => {
        if (localStorage.getItem("item"))
            cartCount(JSON.parse(localStorage.getItem("item")).length);
        else
            cartCount(0);
    }, [cartRefresh])

    const open = (refId) => {
        Navigate(`/singlepost/${refId}`)
    }

    function handleDelete(refId) {

        if (localStorage.getItem("item")) {
            const tempArr = []
            tempArr.push(...JSON.parse(localStorage.getItem("item")).filter(e => (e.id !== refId)));
            localStorage.removeItem("item");
            if (tempArr.length > 0)
                localStorage.setItem("item", JSON.stringify(tempArr));
            toast.success("Item removed from cart");
        }
        setcartRefresh(prev => (!prev))
    }

    function handleQty(refId, event) {

        const value = parseInt(event.target.value);

        qtyRef.current = value;
        // setQty(value);

        cartData.map(e => {
            if (e.refId === refId)
                e.quantity = qtyRef.current;
            return (null);
        })
        const tempArr = [];
        tempArr.push(...JSON.parse(localStorage.getItem("item")).filter(e => (e.id !== refId)));
        tempArr.push({ id: refId, qty: qtyRef.current });
        localStorage.removeItem("item");
        localStorage.setItem("item", JSON.stringify(tempArr));
        setcartRefresh(prev => (!prev))
        // console.log(cartData);
    }

    function handleCheckout(paymentType, total, storageData) {
        if (total >= 100 && total <= 10000) {
            if (loginState) {
                axios({
                    method: "post",
                    url: `${process.env.REACT_APP_SERVER_URL}/pay/orders`,
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
                            "name": userData.name,
                            "email": userData.email,
                            "contact": ""
                        },
                        "notes": {
                            "ItemDetails": JSON.stringify(storageData)
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
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                            };
                            await axios({
                                method: "post",
                                url: `${process.env.REACT_APP_SERVER_URL}/pay/paymentstatus`,
                                data: { status: true, ...data, date: new Date().toUTCString(), email: userData.email, cart: storageData, amount: total, paymentType: paymentType }
                            }).then(response => {

                                alert("Payment Success");
                                toast.success("Payment Success", {
                                    onClose: () => {
                                        // console.log(response);
                                        Navigate("/history/purchase");
                                        localStorage.removeItem("item");
                                    }
                                });
                            })
                        },
                    };

                    // redirect: "",
                    // callback_url: "",

                    const paymentObject = new window.Razorpay(options);

                    paymentObject.on('payment.failed', async function (response) {
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
                            url: `${process.env.REACT_APP_SERVER_URL}/pay/paymentstatus`,
                            data: { status: false, ...data, date: new Date().toUTCString(), email: userData.email, cart: storageData, amount: total, paymentType: paymentType }
                        }).then(response => {
                            // console.log(response)
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
        else
            toast.warning("Payments within 100 to 10000 are allowed");
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

    totalRef.current = 0;
    // purchaseData.current = "";

    return (
        <>
            <section>

                <div className="mt-2">
                    <div className=" bg-dark text-center">
                        <h1 className="text-light">Rental Cart</h1>
                    </div>
                </div>

                {
                    isCartEmpty ?
                        <div className="emptyCart">
                            <h1>Oops! Your cart is Empty</h1>
                            <button onClick={() => { Navigate("/rent") }} className="btm btn-sm btn-primary">Go Shopping</button>
                        </div>
                        :

                        !isLoaded ? <Loader /> :

                            <div className='row m-1 cartBgCls'>
                                <div className='col-lg-9 col-md-8 col-12'>

                                    {
                                        category.map((element, ind) => {

                                            return (

                                                <div key={ind} className="row mx-auto my-auto">

                                                    {
                                                        cartData.filter(ele => (ele[element] === true))

                                                            .map((e, index) => {

                                                                qtyRef.current = e.quantity;

                                                                totalRef.current += (e.quantity * e.price);

                                                                // purchaseData.current += (e.brand + "-" + e.modelName + ",");

                                                                return (

                                                                    <div key={index} className="row mx-auto p-0" >

                                                                        <div className={e.paSystem ? "bg-primary text-light mt-2" : e.illuminary ? "bg-warning mt-2" : e.powerSystem ? "bg-danger text-light mt-2" : ""}>
                                                                            <h4 className="my-auto"> {index === 0 ? e.paSystem ? "PA Systems" : e.illuminary ? "Illuminaries" : e.powerSystem ? "Power Systems" : null : null}</h4>
                                                                        </div>

                                                                        <div className='containerDiv bg-light'>
                                                                            <div onClick={() => { open(e.refId) }} className="col-lg-4 col-md-4 col-4 cartImgDiv ">
                                                                                <img className="cartImgCls mx-auto my-auto" style={{ height: "100%" }} alt={e.modelName} src={e.imageUrl} />
                                                                            </div>

                                                                            <div className="col-lg-8 col-md-8 col-8 float-start cartCardDiv">

                                                                                <div className="row">
                                                                                    <h5 onClick={() => { open(e.refId) }} className="mt-1">{`${e.brand} - ${e.modelName}`}</h5>
                                                                                    {/* <p className="justify-content-center">{e.breif}</p> */}
                                                                                    <div className="row my-auto">
                                                                                        <p className="cartPriceTag mt-1">{`Rs. ${e.price}/-`}</p>
                                                                                        <button style={{ margin: "auto", width: "fit-content", height: "fit-content" }} onClick={() => { handleDelete(e.refId) }} className='btn btn-sm btn-outline-danger'>Delete</button>
                                                                                    </div>
                                                                                    {/* <hr /> */}
                                                                                </div>

                                                                                <div className="row my-auto">
                                                                                    <div style={{ width: "fit-content" }} className="my-1">
                                                                                        <label htmlFor='quantity'>Qty</label>
                                                                                        <select onChange={(event => { handleQty(e.refId, event); })} value={qtyRef.current} id='quantity'>
                                                                                            <option>1</option>
                                                                                            <option>2</option>
                                                                                            <option>3</option>
                                                                                            <option>4</option>
                                                                                            <option>5</option>
                                                                                            <option>6</option>
                                                                                            <option>7</option>
                                                                                            <option>8</option>
                                                                                            <option>9</option>
                                                                                            <option>10</option>
                                                                                        </select>
                                                                                    </div>

                                                                                    <div style={{ width: "fit-content", margin: "auto" }}>{`Total Rs.${e.price * qtyRef.current}/-`}</div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                )
                                                            })
                                                    }

                                                </div>

                                            )
                                        })
                                    }

                                </div>

                                <div className='col-lg-3 col-md-4 col-12 mt-2 checkoutCls'>

                                    <div className="row card mx-auto" >
                                        <div className="card-body">
                                            <h5 className="card-title">Sub Total</h5>
                                            <p className="card-text justify-content-center">You can proceed by paying the Total amout or the advance.</p>
                                            <div>
                                                <label htmlFor='total'>Total Amount <small className="text-success">{` (*Inc. all taxes)`}</small></label>
                                                <p id='total' className="priceTag">{`Rs.${totalRef.current}/-`}</p>
                                                <label htmlFor='advance'>Advance Amount</label>
                                                <p id="advance" className="priceTag">{`Rs.${totalRef.current * .25}/-`}</p>
                                                <small className="text-success">{`* In advance payment method, rest of the rent (Rs.${totalRef.current * .75}/-) has to be settled, while returning the items back to the store.`}</small>
                                                <div className='mt-2'>
                                                    <button onClick={() => { handleCheckout("Full Payment", totalRef.current, storageData) }} className="btn btn-sm btn-primary">Pay Total</button>
                                                    <button onClick={() => { handleCheckout("Advance Payment", totalRef.current * .25, storageData) }} className="btn btn-sm btn-primary ms-2 ">Pay Advance</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                }

            </section >
        </>
    )
}

export default Cart;