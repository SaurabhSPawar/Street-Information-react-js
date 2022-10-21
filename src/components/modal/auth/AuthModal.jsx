import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import Login from './Login';
import SignUp from './SignUp';

const AuthModal = ( props ) => {

    let [ isLoginPage, updateCurrentLoginState ] = useState( true );

	const modalBox = {
        width   : '100%',
        height  : '100%'
    };

    const modalBoxTitle = {
        color       : 'white',
        background  : '#1976d2',
        width       : '100%',
        height      : '15%',
    };

    const modalBoxBody = {
        top     :   0,
        width   : '100%',
        height  : '70%',
    };

    const modalBoxFooter = {
        color       : '#1976d2',
        width       : '100%',
        height      : '15%',
        marginTop   : '100px',
        marginLeft  : '10px',
        marginBottom: '20px'
    }
    const updateAuthModalState = ( type ) => {
        if(type === 'login'){
            props.setLoginAuthStatusTrue();
        }
    }
    return ( 
            <Box sx={ modalBox } >
                <Box sx={ modalBoxTitle } >
                    <Typography variant="h3" component="h3" className='title-text' >
                        { ( true === Boolean(isLoginPage) ) ? 'Login' : 'Sign Up' }
                    </Typography>
                </Box>
                <Box sx={ modalBoxBody } >
                    {isLoginPage && (
                        <>
                            <Login updateAuthModalState = { updateAuthModalState }/>
                        </>  
                    )}
                    {!isLoginPage && (
                        <>
                            <SignUp/>
                        </>
                    )}
                    <Box sx={ modalBoxFooter } >
                        <Typography variant="span" component="span" >
                            {isLoginPage && (
                                <div>
                                    Need an account ?&nbsp;
                                    <Link href="#" underline="always"  onClick = { () => { updateCurrentLoginState( false ) } }>
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                            { !isLoginPage && (
                                <div>
                                    Already a user ?&nbsp;
                                    <Link href="#" underline="always" onClick = { () => { updateCurrentLoginState( true ) } }>
                                        Login
                                    </Link>
                                </div>
                            ) }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        );
}
export default AuthModal;