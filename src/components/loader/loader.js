import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


function Loader() {
    return (
        <Backdrop open={true}
         sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default Loader;

