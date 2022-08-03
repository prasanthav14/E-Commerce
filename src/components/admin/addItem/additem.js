import React, { useState, useRef } from 'react';

import { Spinner } from 'react-bootstrap';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import storage from "../../../firebaseconfig.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "../../loader/loader.js";
import { adminStore, userStore } from '../../../zustand/store';


function AddItem() {

    const loginState = userStore(state => state.user.loginState);

    const [fields, setFields] = useState({ ModelName: "", SubCategory: "", Brand: "", Breif: "", Power: "", Price: "", ImageUrl: `${process.env.REACT_APP_DEFAULT_IMG_URL}` });
    const [check, setCheck] = useState({ onStage: true, OpenStage: false, PaSystem: true, Illuminary: false, PowerSystem: false })

    //file upload
    const [imageData, setimageData] = useState("");
    // const [imageRef, setImageRef] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const [isUploaded, setIsuploaded] = useState(false);

    const clearRef = useRef();

    // const setAdminGlobalState = adminStore(state => state.setAdminGlobalState);
    const adminGlobalState = adminStore(state => state.adminGlobalState);


    function handleType(event) {
        const { name, value } = event.target;
        setFields(prev => {
            return { ...prev, [name]: value }
        })
        // console.log(fields);
    }

    function handleCheckbox(event) {
        // console.log(event.target);
        const { id, checked } = event.target;
        if (id === "PaSystem")
            setCheck(prev => {
                return ({ ...prev, PaSystem: true, Illuminary: false, PowerSystem: false })
            })
        else if (id === "Illuminary")
            setCheck(prev => {
                return ({ ...prev, PaSystem: false, Illuminary: true, PowerSystem: false })
            })
        else if (id === "PowerSystem")
            setCheck(prev => {
                return ({ ...prev, PaSystem: false, Illuminary: false, PowerSystem: true })
            })
        else if (id === "onStage")
            setCheck(prev => {
                return ({ ...prev, [id]: checked })
            })
        else if (id === "OpenStage")
            setCheck(prev => {
                return ({ ...prev, [id]: checked })
            })
        // console.log(check)
    }
    function clearfileinputfield() {
        clearRef.current.value = "";
    }

    async function handleUpload() {
        if (imageData) {
            setIsLoading(true);
            let storageRef;
            if (check.PaSystem)
                storageRef = ref(storage, `PaSystem/${fields.SubCategory}/${fields.Brand}_${fields.ModelName}`);
            else if (check.Illuminary)
                storageRef = ref(storage, `Illuminary/${fields.SubCategory}/${fields.Brand}_${fields.ModelName}`);
            else if (check.PowerSystem)
                storageRef = ref(storage, `PowerSystem/${fields.SubCategory}/${fields.Brand}_${fields.ModelName}`);
            else {
                storageRef = ref(storage, `unCatagorized/${fields.SubCategory}/${fields.Brand}_${fields.ModelName}`);
            }

            await uploadBytes(storageRef, imageData)
                .then(async (snapshot) => {

                    await getDownloadURL(ref(storage, `gs://${snapshot.ref.bucket}/${snapshot.ref.fullPath}`))
                        .then(url => {
                            setFields(prev => ({ ...prev, ImageUrl: url }));
                            setIsLoading(false);
                            setIsuploaded(true);
                            toast.success(`Image Uploaded Successfully`);
                        })
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    setIsuploaded(false);
                    toast.error(`Error Uploading Image`);
                });
        }
    }

    // console.log(imageRef);
    // console.log(fields);

    async function handleSubmit(event) {
        event.preventDefault();
        // console.log({ ...fields, ...check });
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}/item/additem`,
            data: { ...fields, ...check },
            responseType: 'json',
        })
            .then((resp) => {
                // if (resp.status === 200) {
                    // console.log(resp.data);
                    // console.log("data transfer success");

                    toast.success(`New item added successfully`);
                    setFields({ ModelName: "", SubCategory: "", Brand: "", Breif: "", Power: "", Price: "", ImageUrl: `${process.env.REACT_APP_DEFAULT_IMG_URL}` });
                    setCheck({ onStage: true, OpenStage: false, PaSystem: true, Illuminary: false, PowerSystem: false });
                    setIsuploaded(false);
                    setimageData("");
                    // setImageRef("");
                // }
                // else {
                //     console.log(resp.status + " : " + resp.statusText)
                //     toast.error(`Error adding new item`);
                // }
            })
            .catch(err => {
                console.log("error api fetch: ");
                console.log(err);
                toast.error(`Error adding new item`);
            })

        // setIsuploaded(true);
        clearfileinputfield();

    }

    return (
        <>

            {(!loginState) ? <Loader /> :

                <div className='container'>
                    <div className='row m-1'>

                        <form className="bg-light p-4" onSubmit={handleSubmit}>

                            <div className="row my-1 text-left">
                                <h2>{adminGlobalState}</h2>
                                <hr />
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-12">

                                    <div className="form-group mb-4" id="tags">
                                        <label htmlFor='tags'>Item Category</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input onChange={handleCheckbox} className="form-check-input" defaultChecked type="radio" name="inlineRadioOptions" id="PaSystem" />
                                                <label className="form-check-label" htmlFor="inlineRadio1">PaSystem</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input onChange={handleCheckbox} className="form-check-input" type="radio" name="inlineRadioOptions" id="Illuminary" />
                                                <label className="form-check-label" htmlFor="inlineRadio2">Illuminary</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input onChange={handleCheckbox} className="form-check-input" type="radio" name="inlineRadioOptions" id="PowerSystem" />
                                                <label className="form-check-label" htmlFor="inlineRadio3">Power System</label>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="form-group mb-4">
                                        <label htmlFor='tags'>Item Type</label>
                                        <div className="" id="tags">
                                            <div className="form-check form-check-inline me-4">
                                                <input onChange={handleCheckbox} checked={check.onStage} className="form-check-input" type="checkbox" id="onStage" />
                                                <label className="form-check-label" htmlFor="onStage">On Stage</label>
                                            </div>
                                            <div className="form-check form-check-inline me-4">
                                                <input onChange={handleCheckbox} checked={check.OpenStage} className="form-check-input" type="checkbox" id="OpenStage" />
                                                <label className="form-check-label" htmlFor="OpenStage">Open Stage</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="Sub Category">Sub Category</label>
                                        <input type="text" required name="SubCategory" value={fields.SubCategory} onChange={handleType} className="form-control" id="Sub Category" placeholder="eg. Mic, Spotlight..." />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label htmlFor="Brand">Brand</label>
                                        <input type="text" required name="Brand" value={fields.Brand} onChange={handleType} className="form-control" id="Brand" placeholder="Enter the item brand name..." />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label htmlFor="ModelName">Model Name</label>
                                        <input type="text" required name="ModelName" value={fields.ModelName} onChange={handleType} className="form-control" id="ModelName" placeholder="Enter the item model name..." />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="Breif">Breif</label>
                                        <textarea type="text" required name="Breif" value={fields.Breif} onChange={handleType} className="form-control" id="Breif" placeholder="Breif about item..." />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label htmlFor="Power">Power</label>
                                        <input type="text" name="Power" value={fields.Power} onChange={handleType} className="form-control" id="Power" placeholder="eg. 1000W" />
                                    </div>

                                    <div className="form-group mb-4">
                                        <label htmlFor="Price">Price</label>
                                        <input type="text" required name="Price" value={fields.Price} onChange={handleType} className="form-control" id="Price" placeholder="eg. 1000" />
                                    </div>

                                    <label htmlFor="UploadImage">Upload image <small className='text-danger'>{` (Aspect Ratio must be 1:1, prefered Res. 640px)`}</small></label>
                                    <div className="form-group mb-3 d-flex justify-content-between">
                                        <div className="col-lg-11 col-md-11 col-11" >
                                            <input type="file" required name="UploadImage" onInput={(event) => { setimageData(...event.target.files) }} className="form-control " id="UploadImage" ref={clearRef} />
                                        </div>

                                        {isLoading &&
                                            <div style={{ textAlign: "right" }} className="col-lg-1 col-md-1 col-1 my-auto">
                                                <Spinner animation="border" id="Spinner" variant="primary" />
                                            </div>}

                                        {isUploaded &&
                                            <div style={{ textAlign: "right" }} className="col-lg-1 col-md-1 col-1 my-auto">
                                                <CheckCircleIcon style={{ color: "green" }} />
                                            </div>}
                                    </div>

                                    <div className="form-group mb-4">
                                        <div className="">
                                            <button disabled={imageData?false:true} onClick={handleUpload} type="button" className="btn btn-sm btn-primary">Upload</button>
                                        </div>
                                    </div>

                                    <div className="form-group mb-4">
                                        <button type="submit" className="btn btn-sm btn-danger">Add to List</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
}

export default AddItem;
