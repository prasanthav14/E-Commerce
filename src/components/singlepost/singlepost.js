import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import LoadingSpinner from "../loadingAnim/loadingAnim.js";
import './singlepost.css';
import Loader from "../loader/loader.js";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

import { useNavigate } from "react-router-dom";
import cartCountStore from '../../zustand/store';

function Singlepost() {
    const { refId } = useParams();              //-----> refer App.js
    const [isLoaded, setIsloaded] = useState(false);
    const [itemData, setItemData] = useState("");
    // const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState("");
    // const [comment, setComment] = useState([]);
    // const [currentuser, setCurrentuser] = useState("");
    const [cartRefresh, setcartRefresh] = useState(false);
    const cartCount = cartCountStore(state => state.cartCount);

    const Navigate = useNavigate();

    useEffect(() => {
        console.log(refId);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/item/readsingleitem`,
            data: { id: refId },
            responseType: 'json',
        })
            .then((resp) => {
                // if (resp.status === 200) {
                //   console.log(resp.data);
                // console.log(resp.data);
                // console.log("data transfer success");
                setItemData(resp.data);
                setIsloaded(true);
                // }
                // else {
                //     console.log(resp.status + " : " + resp.statusText)
                //     setIsloaded(false);
                //     Navigate(-1);
                // }
            })
            .catch(err => {
                console.log("error api fetch: ");
                console.log(err);
                setIsloaded(false);
                Navigate(-1);
            })

    }, []);

    useEffect(() => {
        if (localStorage.getItem("item"))
            cartCount(JSON.parse(localStorage.getItem("item")).length);
        else
            cartCount(0);
    }, [cartRefresh])

    const pageloaded = () => {
        return (null);
    }

    function handleComment() {
        toast.warning(`This feature currently unavailable`);
        // const status = () => {
        //     onAuthStateChanged(auth, (user) => {
        //         if (user) {
        //             if (text !== "") {
        //                 // console.log(`${user.displayName} is the current user at commentFn`);
        //                 const timeNow = new Date().toUTCString();
        //                 // setComment(pre=>[...pre, { user: user.displayName, comment: text, time: timeNow }])
        //                 comment.push({ user: user.displayName, comment: text, time: timeNow });

        //                 const uploadComment = async () => {
        //                     try {
        //                         const userRef = doc(db, "userData", key);
        //                         await updateDoc(userRef, {
        //                             Comments: comment
        //                         }).then(() => {
        //                             // console.log("comments updated: " + user.displayName);
        //                         })
        //                     }
        //                     catch (error) { console.error(error); }
        //                 }
        //                 uploadComment();
        //                 setText("");
        //             }
        //         }
        //         else {
        //             setText("");
        //             // console.log('User signed out');
        //             toast.error(`User not logged-in`, { onClose: () => Navigate("/userlogin") });
        //             return (null);
        //         }
        //     })
        // }
        // status();
        return (null);

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
        toast.success(`Item added to cart`);
    }

    return (
        <div className="container mt-2">
            <div className="row mx-auto my-auto">


                {(!isLoaded) ? <Loader /> :

                    <div className="card bg-light p-2">
                        <div>
                            <img src={itemData.imageUrl} onLoad={pageloaded} className="row mt-2 postImg mx-auto card-img-top" alt={itemData.modelName} />
                            {/* onLoad={setIsLoading(false)} */}
                        </div>

                        <div className="card-body col-md-6 col-lg-6">
                            <div className="row ps-3" style={{ textAlign: "center" }}>
                                {itemData.onStage && <h6 className="tagCls">On Stage</h6>}
                                {itemData.openStage && <h6 className="tagCls">Open Stage</h6>}
                                {itemData.paSystem && <h6 className="tagCls">PA System</h6>}
                                {itemData.illuminary && <h6 className="tagCls">Illuminary</h6>}
                                {itemData.powerSystem && <h6 className="tagCls">Power System</h6>}
                            </div>


                            <div className="row">
                                <div className="col-lg-6 col-7">
                                    <div className="text-left">
                                        <p className="singlePriceTag fst-italic my-auto">{`Rs. ${itemData.price}/-`}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: "right" }} className="col-lg-6 col-5 my-auto">
                                    <button onClick={() => { addToCart(itemData.refId) }} className="btn btn-sm btn-primary my-auto">Add to cart</button>
                                </div>
                            </div>



                            <h3 className="card-title mt-3">{`${itemData.brand} - ${itemData.modelName}`}</h3>
                            {/* <p style={{ textAlign: "justify" }} className="card-text">{dbData.breif}</p> */}
                            {itemData.breif && itemData.breif.split('$').map((e, index) => (<p key={index} style={{ textAlign: "justify" }} className="card-text">{e}</p>))}

                            <h4 className="card-title mb-2">Technical Specification</h4>

                            <div className="specCls">
                                {itemData.subCategory && <h6>{`Category : ${itemData.subCategory}`}</h6>}
                                {itemData.brand && <h6>{`Brand : ${itemData.brand}`}</h6>}
                                {itemData.modelName && <h6>{`Model : ${itemData.modelName}`}</h6>}
                                {itemData.power && (itemData.power !== 0) ? <h6>{`Power : ${itemData.power}`} </h6> : null}
                                <h6>{`Item class : ${itemData.paSystem ? `PA System` : `${itemData.illuminary ? `Illuminary` : `Power System`}`}`}</h6>
                            </div>

                            {/* add comments */}
                            <div className="mb-5 form-group col-lg-12">
                                <h3 htmlFor="comment">Reviews</h3>
                                {/* {comment.map((e, index) => (
                                    <div key={index} className='card-text commentDiv col-md-12'>
                                        <h6><pre>{e.user}</pre></h6>
                                        <h6 className="commentText">{e.comment}</h6>
                                        <h6 className='commentTime'>{new Date(e.time).toLocaleString()}</h6>
                                    </div>
                                ))} */}
                                <div className='card-text col-lg-12'>
                                    <textarea type="text" value={text} onChange={(event) => { setText(event.target.value) }} className="commentboxDiv form-control" id="comment" placeholder="Write your review here..." />
                                </div>

                                <button type="button" onClick={handleComment} className="mt-2 mb-3 btn btn-sm btn-danger"><small>Publish</small></button>
                            </div>

                            <h6 className="card-text"><small className="preCls text-muted">{new Date(itemData.refId).toLocaleString()}</small></h6>

                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Singlepost
