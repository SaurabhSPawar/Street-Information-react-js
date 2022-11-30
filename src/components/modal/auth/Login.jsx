import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { toast } from 'react-toastify'; 
import { useSelector, useDispatch } from 'react-redux';
import { updateUserCredentials } from '../../../action/index';
import axios from 'axios';
import { Navigate  } from "react-router";
import Loader from '../../connectors/Loader';

const Login = ( props ) => {

    var userState = useSelector( (state) => state.changeTheUserState );
	const dispatch = useDispatch();

    let [ userData, updateUserData ] = useState( {
        email : '',
        password : ''
    } );

    let [ errorData, updateErrorData ] = useState( {
        email : '',
        password : '',
        all:''
    } );

    let [loaderState, updateLoaderState ] = useState(false)
    const updateUseInformation = ( event ) => {
        let { name,  value } = event.target;
        updateUserData( 
            ( oldData ) => { 
                return( 
                    {...oldData, [name] : value } 
                ) 
            }
        );
    }

    const submitUserLoginForm = ( event ) => {
        
        event.preventDefault();
        updateErrorData( {
            email : '',
            password : '',
            all:''
        } );

        let verified = true;
        if ( false === Boolean( userData.email ) ) {
            verified = false;
            updateErrorData(
                (oldData) =>{
                    let objectName = 'email';
                    return(
                        {
                            ...oldData,
                            [objectName]: 'Email ID required'
                        }
                    )
                }
            )
        }

        if ( false === Boolean( userData.password ) ) {
            verified = false;
            updateErrorData(
                (oldData) =>{
                    let objectName = 'password';
                    return(
                        {
                            ...oldData,
                            [objectName]: 'Password required'
                        }
                    )
                }
            );
        } else if( 5 > userData.password.length ) {
            verified = false;
            updateErrorData(
                (oldData) =>{
                    let objectName = 'password';
                    return(
                        {
                            ...oldData,
                            [objectName]: 'Password length should be greater than 5.'
                        }
                    )
                }
            )
        }

        if ( true === verified ) {
            updateLoaderState(true);
            axios.post('api/login', userData)
            .then(
                async function (response) {
                    updateLoaderState(false);
                    toast.success(response.data.message);
                    updateErrorData( {
                        email : '',
                        password : '',
                        all:''
                    } );
                    //const info = (({ name, image, auth }) => ({ name, image, auth }))(response.data);
                    let { name, image, auth } = response.data;
                    let userDetails = {
                        name:name,
                        image:image,
                    }
                    dispatch(updateUserCredentials(userDetails));
                    userDetails.auth = auth;
                    localStorage.setItem( 'userInfo', JSON.stringify(userDetails) );
                    props.updateAuthModalState('login');
                    {   <Navigate replace to="/listing" />  }
            })
            .catch(
                async function (error) {
                    updateLoaderState(false);
                    console.log(error);
                    updateErrorData( ( oldData ) => {
                        let errorName = 'all';
                        return({
                            ...oldData,
                            [errorName] : 'Please Enter valid credentials'
                        })
                    });
                    toast.error('Failed to login..!');
                }
            )
        }
    }

    return(
        <>
        {loaderState && (
            <Loader/>
        )}
        
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '96%' },
            }}
            style = { { 
                marginTop:'40px'
            } }
            noValidate
            autoComplete="off"
            onSubmit={ submitUserLoginForm }
        >
            <Typography className="component-error-text">
                { errorData.all}
            </Typography>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-email" >Email</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-email"
                    type='text'
                    label="eamil"
                    name = "email"
                    value = { userData.email }
                    onChange = { updateUseInformation }
                />
                <FormHelperText className="component-error-text"> { errorData.email } </FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password" >Password</InputLabel>
                <OutlinedInput
                    
                    id="outlined-adornment-password"
                    type='password'
                    label="Password"
                    name = "password"
                    value = { userData.password }
                    onChange = { updateUseInformation }
                />
                <FormHelperText className="component-error-text">{ errorData.password }</FormHelperText>
            </FormControl>
            <Button variant="contained" type="submit" style={ { marginTop : '30px', width:'max-content', float: 'right', } }>
                Login
            </Button>
        </Box>
        </>
    )
}

export default Login;