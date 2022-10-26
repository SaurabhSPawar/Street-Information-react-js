import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
const Home = () => {

	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: '#fff',
		...theme.typography.body2,
		padding: theme.spacing(1),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		fontSize: '40px',
	  }));

	return(
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Item>Home</Item>
					</Grid>
				</Grid>
			</Box>
		</>
	)
}
export default Home;
