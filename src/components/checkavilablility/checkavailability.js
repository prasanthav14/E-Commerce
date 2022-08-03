import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../loader/loader.js"
import axios from "axios"
import './checkavailability.css';
import { useNavigate } from "react-router-dom";
import cartCountStore from '../../zustand/store';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkavailability() {

    const Navigate = useNavigate();
    const [isLoaded, setIsloaded] = useState(false);
    const [itemData, setItemdata] = useState([]);
    const [button, setButton] = useState({ paSystem: true, illuminary: false, powerSystem: false });
    const { selector } = useParams();
    const [cartRefresh, setcartRefresh] = useState(false);

    const cartCount = cartCountStore(state => state.cartCount);

    useEffect(() => {

        axios({
            method: "get",
            url: `${process.env.REACT_APP_SERVER_URL}/item/readitem`,
        })
            .then((response) => {
                // if (response.status === 200) {
                setItemdata([...response.data]);
                setIsloaded(true);
                // }
                // else {
                //     console.log(response.status);
                // console.log(response);
                //     setIsloaded(false);
                //     setItemdata("");
                // }
            })
            .catch((err) => {
                console.log("err @ check avail readitem");
                console.log(err);
                setIsloaded(false);
                setItemdata("");
            })

        if (selector === "illuminary")
            setButton({ paSystem: false, illuminary: true, powerSystem: false });
        else if (selector === "powerSystem")
            setButton({ paSystem: false, illuminary: false, powerSystem: true });
        else
            setButton({ paSystem: true, illuminary: false, powerSystem: false });

        // console.log(selector);
    }, []);

    useEffect(() => {
        if (localStorage.getItem("item"))
            cartCount(JSON.parse(localStorage.getItem("item")).length);
        else
            cartCount(0);
    }, [cartRefresh])

    const open = (refId) => {
        Navigate(`/singlepost/${refId}`)
    }

    function addToCart(refId) {
        let tempObj = [];
        // console.log(localStorage.getItem("item"))
        if (localStorage.getItem("item")) {
            tempObj = JSON.parse(localStorage.getItem("item"));
            if (tempObj.filter(e => (e.id === refId)).length === 0) {
                tempObj.push({ id: refId, qty: 1 });
                localStorage.removeItem("item");
                localStorage.setItem("item", JSON.stringify(tempObj));
            }
        }
        else {
            tempObj.push({ id: refId, qty: 1 });
            localStorage.setItem("item", JSON.stringify(tempObj));
        }
        setcartRefresh(prev => (!prev));
        toast.success("Item added to cart");
    }

    return (
        <>
            <div className="mt-2">
                <div className=" bg-dark text-center">
                    <h1 className="text-light">Check Availability</h1>
                </div>
            </div>

            <div className="bg-light my-1 d-flex">
                <div className="my-auto col-4 bg-primary" style={{ textAlign: "center" }}>
                    <button onClick={() => {
                        setButton(({ paSystem: true, illuminary: false, powerSystem: false })) 
                        Navigate("/availability/paSystem")
                    }} type='button' className='filterBtnCls btn btn-sm btn-primary'>PA Systems</button>
                </div>
                <div className="my-auto col-4 bg-warning" style={{ textAlign: "center" }}>
                    <button onClick={() => {
                        setButton(({ paSystem: false, illuminary: true, powerSystem: false })) 
                        Navigate("/availability/illuminary")
                    }} type='button' className='filterBtnCls btn btn-sm btn-warning'>Illuminaries</button>
                </div>
                <div className="my-auto col-4 bg-danger" style={{ textAlign: "center" }}>
                    <button onClick={() => {
                        setButton(({ paSystem: false, illuminary: false, powerSystem: true })) 
                        Navigate("/availability/powerSystem")
                    }} type='button' className='filterBtnCls btn btn-sm btn-danger'>Power Systems</button>
                </div>
            </div>

            {(!isLoaded) ? <Loader /> :
                <section>
                    <div className="container bg-light p-2">

                        <div className="row">
                            <div className="my-2">
                                <h3>{button.paSystem ? "PA System" : button.illuminary ? "Illuminaries" : button.powerSystem ? "Power Systems" : null} </h3>
                                < hr />
                            </div>
                            {itemData
                                .filter(e => (e.paSystem === button.paSystem && e.illuminary === button.illuminary && e.powerSystem === button.powerSystem))
                                .map((ele, index) => {
                                    return (

                                        <div key={index} className="singleCardDivCls col-lg-3 col-md-4 col-6">
                                            <div className="card mx-auto singleCardCls" >
                                                <img className="singleImgCls" onClick={() => { open(ele.refId) }} src={ele.imageUrl} alt={ele.modelName} />
                                                <div className="card-body">
                                                    <h5 onClick={() => { open(ele.refId) }} className="card-title">{`${ele.brand}-${ele.modelName}`}</h5>
                                                    <small onClick={() => { open(ele.refId) }} className="card-texts text-justify">{ele.breif.length > 70 ? <span>{ele.breif.substring(1, 100) + "..."}<span style={{ color: "blue", textDecoration: "underline" }}>more</span></span> : ele.breif}</small>
                                                    <div>
                                                        <p className="priceTag fst-italic">{`Rs. ${ele.price}/-`}</p>
                                                        <button onClick={() => { addToCart(ele.refId) }} className="btn btn-sm btn-primary">Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        // </div>
                                    )
                                }
                                )}
                        </div>
                    </div>

                </section>
            }
        </>
    )
}

export default Checkavailability;