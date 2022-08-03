import React from 'react';

import AdminSelection from '../../components/admin/adminselection/adminselection';
import AddItem from '../../components/admin/addItem/additem';
import UserData from '../../components/admin/userdata/userdata';
import AddAdmin from '../../components/admin/addadmin/addadmin';
// import Carousal from '../../components/carousal/carousal';
import Head from '../../components/head/head'
import Footer from '../../components/footer/footer'

import { adminStore } from '../../zustand/store';

function AdminPage() {

  const adminGlobalState = adminStore(state => state.adminGlobalState);

  return (
    <>
     {/* <React.StrictMode> */}
      <Head />
      {/* <Carousal /> */}
      <AdminSelection/>

      {adminGlobalState==="Add Item" ? <AddItem/> : adminGlobalState==="Read User" ? <UserData/> : adminGlobalState==="Edit User" ? <AddAdmin/> : null }
      
      {/* </> */}
      <Footer/>
     {/* </React.StrictMode> */}
    </>
  );
}

export default AdminPage;
