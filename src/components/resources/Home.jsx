import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Card, CardContent, CardActions, Grid, Paper, InputBase, IconButton, Link } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import Loader from '../connectors/Loader';

const Home = () => {
	let [ cityDetails, setCityDetails ] = useState({
		name : '',
		rating : 0
	});

	let [ showCityDetails, setShowCityDetails ] = useState( false ); 

	let [ countDetatis, setCountDetails ] = useState({
		user : 0,
		city : 0,
		place : 0
	});

	let [ search, updateSearch ] = useState('');

	let [ loaderState, updateLoaderState ] = useState( false );

	useEffect(
		() => {
			updateLoaderState(true);
			axios.get( 'api/get-all-count' )
			.then( async function ( response ) {
				updateLoaderState( false );
				var userCountsResult = response.data;
				let { user, city, place } = userCountsResult;
				setCountDetails( () => {
					return({
						'user' : ( true === Boolean( user ) ? user : 0 ),
						'city' : ( true === Boolean( city ) ? city : 0 ),
						'place' : ( true === Boolean( place ) ? place : 0 )
					});
				});
			})
			.catch(	async function ( error ) {
				updateLoaderState( false );
			});
		}, []
	);

	const updateSearchData = ( event ) => {
		updateSearch( event.target.value );
	}

	const searchCity = () => {
		if ( true === Boolean( search ) ) {
			axios.get( 'api/city-details/' + search )
			.then(
				async function ( response ) {
					setShowCityDetails( true );
					
					let resultCity = response.data;
					if ( resultCity ) {
						setCityDetails({
							name : resultCity.name,
							rating : resultCity.rating
						});
					}
				}
			)
			.catch(
				async function ( error ) {
					setShowCityDetails( false );
				}
			);
		} else {
			setShowCityDetails( false );
		}
	}
	return (
		<Container maxWidth="xl">
			{loaderState && (
				<Loader/>
			)}
			<Box sx={{ height: '60vh' }}>
				<Grid container spacing={3} style={ { 'marginTop' : '30px' } }>
					<Grid item xs={4}>
						<Card sx={{ backgroundColor: '#fbfbfb' }}>
							<CardContent>
								<span style={{ fontSize : 'large' }}> Total Users </span>
								<br/>
								<span style={{ fontSize : '-webkit-xxx-large' }}> { countDetatis.user } </span>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card sx={{ backgroundColor: '#fbfbfb' }}>
							<CardContent>
								<span style={{ fontSize : 'large' }}> Total Cities </span>
								<br/>
								<span style={{ fontSize : '-webkit-xxx-large' }}> { countDetatis.city } </span>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={4}>
						<Card sx={{ backgroundColor: '#fbfbfb' }}>
							<CardContent>
								<span style={{ fontSize : 'large' }}> Total Places </span>
								<br/>
								<span style={{ fontSize : '-webkit-xxx-large' }}> { countDetatis.place } </span>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
				<Grid container spacing={1} style={ { 'marginTop' : '30px' } }>
					<Grid item xs={12}>
						<Card sx={{ backgroundColor: '#fbfbfb' }}>
							<CardContent>
								<Paper
									component="form"
									sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
									>
									<InputBase
										sx={{ ml: 1, flex: 1 }}
										placeholder="Search City"
										inputProps={{ 'aria-label': 'search City' }}
										value = { search }
										onChange = { updateSearchData }
									/>
									<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={ searchCity }>
										<SearchIcon />
									</IconButton>
								</Paper>
								<Box sx={{ height: '37vh' }}>
									<Grid container spacing={1} style={ { 'marginTop' : '30px' } }>
										<Grid item xs={12}>
											{ showCityDetails && (
												<Card sx={{ backgroundColor: '#fbfbfb' }}>
													<CardContent>
													<Typography variant="h5" component="div">
														City Name : { cityDetails.name }
													</Typography>
													<Typography sx={{ mb: 1.5 }} color="text.secondary">
														City Rating : { cityDetails.rating }
													</Typography>
													</CardContent>
													<CardActions>
														<Link href="#" variant="body2">See places of this city</Link>
													</CardActions>	
												</Card>
											) }

											{ !showCityDetails && (
												<Card sx={{ backgroundColor: '#fbfbfb' }}>
													<CardContent>
														<Typography variant="h3" component="h3" style={{ textAlign:'center', color: '#ced1df' }} >
															No Data Available
														</Typography>
													</CardContent>
												</Card>	
											) }
										</Grid>
									</Grid>
								</Box>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</Container>
	)
}
export default Home;
