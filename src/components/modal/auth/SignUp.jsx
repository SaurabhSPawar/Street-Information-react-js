import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
const SignUp = () => {
    return(
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
        >
            <TextField id="signup-name" label="Name" variant="outlined" />
            <TextField id="signup-email" label="Email" variant="outlined" />
            <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type='password'
                    label="Password"
                />
            </FormControl>
            <TextField
                id="date"
                label="Birthday"
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                shrink: true,
                }}
            />
            <Button variant="contained"  style={ { marginTop : '30px', width:'max-content', float: 'right', } }>
                SignUp
            </Button>
        </Box>
    )
}

export default SignUp;