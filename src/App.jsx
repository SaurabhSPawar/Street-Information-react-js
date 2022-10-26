import React from "react";
import HeaderNav from './components/HeaderNav';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserCredentials } from './action/index';
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer, toast } from 'react-toastify'; 
import { Routes, Route } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Home from './components/resources/Home';
import Listing from './components/resources/propertyListings/Listing';
import City from './components/resources/propertyListings/cities/City';
const App = () => {

	const myState = useSelector( (state) => state.changeTheUserState );
	const dispatch = useDispatch();

    return(
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
			<HeaderNav/>
            <ToastContainer className="toast-top-right"/> 
            <Routes>
                <Route exact path="/" element={ <Home/> }></Route>
                <Route exact path="/listing" element={ <Listing/> }></Route>
                <Route exact path="/city/:uuid" element={ <City/> }></Route>
            </Routes>
        </>
    );
}

export default App;