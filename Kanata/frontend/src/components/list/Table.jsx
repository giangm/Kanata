import React from 'react';
import { NavLink } from 'react-router-dom';

import { List, ListItem, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

import { fetchList } from '@/api/Api';
import { COLORS } from '@/constants/Constants';

class Table extends React.Component {
  state = {
    data: [],
  };

  componentDidMount = async () =>
    this.setState({ data: await fetchList() });

  rows = () => {
    let challenges = [];
    Object.entries(this.state.data).map(([key, item]) => {
      const theme = createTheme({
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                ':hover': {
                  background: COLORS[key % COLORS.length],
                  color: '#000',
                },
                background: 'transparent',
                color: '#FFF',
              },
            },
          },
        },
      });
      challenges.push(
        <ThemeProvider theme={theme} key={key}>
          <NavLink to={`/challenge/${item.name}`} className="w-full md:w-8/12">
            <ListItem className="w-full md:w-96 h-20">
              <Paper elevation={8} className="flex-between flex-row gap-4 md:gap-52 w-full h-full p-4">
								<div className="w-1/4">
									<Typography variant="body1" className="md:w-auto w-1/4">{item.name}</Typography>
								</div>
								<div>
									<Typography variant="body1" className="capitalize">{item.status}</Typography>
								</div>
								<div>
                	{item.favourite ? (<FavoriteIcon className="text-error" />) : (<FavoriteBorderOutlinedIcon />)}
								</div>
								<div>
                	{item.complete ? (<TaskAltIcon className="text-success" />) : (<RadioButtonUncheckedRoundedIcon />)}
								</div>
              </Paper>
            </ListItem>
          </NavLink>
        </ThemeProvider>
      );
    });
    return challenges;
  };

  render() {
    return (
      <>
        <Typography variant="h1" className="text-center my-5">
          Unlock Machine Secrets with Precision: White Box Testing Unleashed!
        </Typography>
        <List className="w-full md:w-screen flex items-center flex-col overflow-y-scroll">
          {this.rows()}
        </List>
      </>
    );
  }
}

export default Table;