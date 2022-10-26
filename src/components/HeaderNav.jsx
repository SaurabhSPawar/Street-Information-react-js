import React,{ useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AuthModal from './modal/auth/AuthModal';
import '../resources/css/header/header.css';
import { toast } from 'react-toastify'; 
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import ExploreIcon from '@mui/icons-material/Explore';
import Grid from '@mui/material/Grid'; 
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';

export default function MenuAppBar() {
	var currentState = useSelector((state) => state.changeTheUserState );
	const navigate = useNavigate()

  	const [auth, setAuth] 			= useState( false );
  	const [anchorEl, setAnchorEl] 	= useState( null );
	const [ openMenuBox, setOpenMeanuBox ] = useState(false);

	const [anchorNavLinks, setAnchorNavLinks] 	= useState( null );

	const [open, setOpen] 		= useState( false );
	const handleOpenAuthModal 	= () => setOpen( true );
	const handleCloseAuthModal 	= () => setOpen( false );

  	const handleChange = (state) => {
		setAuth(state);
  	};

  	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
  	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleNavLinksMenu = (event) => {
		setAnchorNavLinks(event.currentTarget);
  	};

	const handleCloseNavLinksMenu = () => {
		setAnchorNavLinks(null);
	};

	let setLoginAuthStatusTrue = () => {
		setAuth(true);
		setOpen( false );
		setAnchorEl(null);
		handleChange(true);
		handleCloseAuthModal();
		setOpenMeanuBox(true);
		navigate("/listing");
	}

	let setLoginAuthStatusFalse = () => {
		toast.success("User Logout Sucessfully..!");
		localStorage.removeItem('userInfo');
		setOpenMeanuBox(false);
		setAuth(false);
		navigate("/");
	}
	const getUserDetails = ( inputArgunmentTypes ) => {
		let userDetails = localStorage.getItem('userInfo');
		if ( true == Boolean( userDetails ) ) {
			userDetails = JSON.parse(userDetails);
			let finalResult = [];
			inputArgunmentTypes.forEach( ( value ) => {
				finalResult[value] =  userDetails[value];
			});
			return userDetails;
		} else{
			return false
		}
	}

	const Navigationlinks = [
		{ 
			name :'Home',
			url : '/'
		},
		{
			name: 'Cities',
			url : '/listing' 
		}
	];

	useEffect(
		() => {
			async function checkLogin(){
				const authCheck = localStorage.getItem('userInfo');
				if(authCheck){
					setAuth(true);
					setOpen( false );
					setAnchorEl(null);
					handleChange(true);
					handleCloseAuthModal();
					setOpenMeanuBox(true);
				}
			}
			checkLogin();
		}, []
	);

	const authModalStyle = {
		position	: 'absolute',
		top			: '50%',
		left		: '50%',
		transform	: 'translate(-50%, -50%)',
		width		: '400px',
		minHeight	: '440px !important',
		bgcolor		: 'background.paper',
		border		: '#dcdcdc',
		borderRadius: '4% !important',
		boxShadow	: 24
	}
	
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
						
						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
						<ExploreIcon sx={{ display: { xs: 'none', md: 'flex' } } } />
							<div  sx={{ display: (true === Boolean(auth))?'block':'none' } }>
								<IconButton
										size="large"
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										color="inherit"
										style={{ display: (true === Boolean(auth))?'block':'none'}}
										onClick={ ( true === Boolean(auth) ) ?  handleNavLinksMenu : ()=>{} }
									>
									<MenuIcon />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorNavLinks}
									anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
									}}
									open={Boolean(openMenuBox && anchorNavLinks )}
									onClose={handleCloseNavLinksMenu}
								>
									{
										Navigationlinks.map((linkContent, index) => {
										return(
											<MenuItem key={index} onClick={handleCloseNavLinksMenu} style = {{ display: (true === Boolean(auth))?'block':'none' }}>
												<NavLink to={linkContent.url} end style={{ textDecoration:'none', color:'black' }}>
													{linkContent.name}
												</NavLink>
											</MenuItem>
										)
									})
									}
								</Menu>
							</div>
							<ExploreIcon sx={{ display: { xs: 'block', md: 'none' }, mr: 1, height:'55px' }} />
						</Box>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'inline-flex' } }} >
							<ExploreIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, height:'62px' }} />
							<div style={{ display: (true === Boolean(auth))?'inline':'none'}}>
								{
									Navigationlinks.map((linkContent, index) => {
									return(
										<Button
										key={index}
										sx={{ my: 2, color: 'white' }}
										>
										<NavLink to={linkContent.url} end style={{ textDecoration:'none', color:'white' }}>
											{linkContent.name}
										</NavLink>
											
										</Button>
									)
									
								})
								}
							</div>
						</Box>
						<Box sx={{ flexGrow: 0 }} >
							<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									color="inherit"
									onClick={ ( true === Boolean(auth) ) ?  handleMenu : handleOpenAuthModal }
								>
									{ 
										( true == Boolean( getUserDetails( ['image'] )['image'] ) ) ?  
											<IconButton  sx={{ p: 0 }}>
												<Avatar alt="User Profile" src="getUserDetails( ['image'] )['image']" />
											</IconButton>
										:
										<AccountCircle /> 
									}
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
								}}
								open={Boolean(openMenuBox && anchorEl )}
								onClose={handleClose}
							>
								<MenuItem onClick={handleClose} style = {{ display: (true === Boolean(auth))?'block':'none' }}>Profile</MenuItem>
								<MenuItem onClick={handleClose} style = {{ display: (true === Boolean(auth))?'block':'none' }}>My account</MenuItem>
								<MenuItem onClick={setLoginAuthStatusFalse} style = {{ display: (true === Boolean(auth))?'block':'none' }}>Log Out</MenuItem>
							</Menu>
						</Box>
						<>
							<Modal open={open}
								onClose={handleCloseAuthModal}
								aria-labelledby="modal-modal-title"
								aria-describedby="modal-modal-description">
								<Box sx={authModalStyle} className="auth-modal">
									<AuthModal setLoginAuthStatusTrue = { setLoginAuthStatusTrue } />
								</Box>
							</Modal>
                		</>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
