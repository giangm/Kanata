import React from 'react'
import { NavLink } from 'react-router-dom'

import { List, ListItem, Paper, ThemeProvider, Typography, createTheme } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

import { fetchList } from '@/api/Api'
import { COLORS } from '@/constants/Constants'

class Table extends React.Component {
	state = {
		data: [],
	}

	componentDidMount = async () => this.setState({data: await fetchList()})

	rows = () => {
		let challenges = [];
		Object.entries(this.state.data).map(([key, item]) => {
			const theme = createTheme({
				components: {
					MuiPaper: {
						styleOverrides: {
							root: {
								":hover": {
									background: COLORS[key % COLORS.length],
									color: "#000"
								},
								background: "transparent",
								color: "#FFF"
							}
						}
					}
				}
			});
			challenges.push(
				<ThemeProvider theme={theme} key={key}>
					<NavLink to={`/challenge/${item.name}`} className="w-7/12">
						<ListItem className="w-96 h-20">
								<Paper elevation={8} className="flex-between flex-row gap-52 w-full h-full p-4">
									<Typography variant="body1">{item.name}</Typography>
									<Typography variant="body1" className="capitalize">{item.status}</Typography>
									{item.favourite ? <FavoriteIcon className="text-error" /> : <FavoriteBorderOutlinedIcon />}
									{item.completed ? <CheckCircleIcon className="text-success" /> : <RadioButtonUncheckedRoundedIcon />}
								</Paper>
						</ListItem>
					</NavLink>
				</ThemeProvider>
			)
		});
		return challenges;
	}

	render() {
		return (
			<>
				<Typography variant="h1" className="text-center" sx={{my: 5}}>
					Unlock Machine Secrets with Precision: White Box Testing Unleashed!
				</Typography>
				<List className="w-screen flex items-center flex-col overflow-y-scroll">
					{this.rows()}
				</List>
			</>
		)
	}
}

export default Table