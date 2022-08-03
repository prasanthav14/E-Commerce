import React from 'react';
import { useNavigate } from 'react-router-dom';

function Footer() {

    const Navigate = useNavigate();

    return (
        <footer className="py-3 mt-3 bg-light">
            <ul className="nav justify-content-center pb-3 mb-3">
                <li onClick={()=>{Navigate("/")}} className="nav-item"><h6 className="nav-link px-2 text-muted ptrCls">Home</h6></li>
                <li onClick={()=>{Navigate("/booking")}} className="nav-item"><h6 className="nav-link px-2 text-muted ptrCls">Booking</h6></li>
                <li onClick={()=>{Navigate("/rent")}} className="nav-item"><h6 className="nav-link px-2 text-muted ptrCls">Rental</h6></li>
                <li onClick={()=>{Navigate("/aboutus")}} className="nav-item"><h6 className="nav-link px-2 text-muted ptrCls">About Us</h6></li>
            </ul>
            <p className="text-center text-muted">© 2022 Company, Inc</p>
        </footer>
    );
}

export default Footer;