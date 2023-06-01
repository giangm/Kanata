import React from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Typography  from '@mui/material/Typography';
import Card  from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import PestControlIcon from '@mui/icons-material/PestControl';

class ChallengeList extends React.Component {
    
	state = {
        data: [],
        expandedCardIndex: -1,
        cardColors: [
            ['cyan', "#82feea"],
            ['green', "#8efa81"],
            ['orange', "#ffca80"],
            ['pink', "#fe80bf"],
            ['purple', "#9580ff"],
            ['red', "#ff9580"],
            ['yellow', "#fffa80"]
        ]
    };

    componentDidMount() {
        axios.get("http://localhost:8000/api/").then(response => {
            this.setState({ data: response.data});
            console.log(response.data);
        })
    }

	handleMouseEnter = (index) => {
        this.setState({
            expandedCardIndex: index
        });
    };

    handleMouseLeave = () => {
        this.setState({
            expandedCardIndex: -1
        });
    }


    render() {
		const { data } = this.state;

		const list = () => {
            const challenges = [];
            Object.keys(data).map((key, index) => {
                const c = this.state.cardColors[index % this.state.cardColors.length]
                const isExpanded = index === this.state.expandedCardIndex;
                const backgroundColor = isExpanded ? this.state.cardColors[index % this.state.cardColors.length][1] : 'transparent';
                const cardInnerColor = isExpanded ? 'black' : 'white'
                challenges.push(
                    <ListItem key={index} component={NavLink} to={`/challenge/${data[key][2]}`}>
                        <Card sx={{ border: 1, borderColor: c[0] , p: 2}} style={{ backgroundColor: backgroundColor }}
                            onClick={() => this.setState({ expandedCardIndex: index })}
                            onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={this.handleMouseLeave}>
                            <Stack spacing={20} direction="row" alignItems="center">
                                <Avatar sx={{ backgroundColor: c[1] }}>
                                    <PestControlIcon />
                                </Avatar>
                                <Typography  color={cardInnerColor} size="sm">{data[key][2]}</Typography >
                                <Typography color={cardInnerColor}>{data[key][1]}</Typography>
                                <CheckCircleOutlineIcon sx={{ color: cardInnerColor }} />
                                <PanoramaFishEyeIcon sx={{ color: cardInnerColor }} />
                            </Stack>
                        </Card>
                    </ListItem>
                );
            });
            return challenges;
        };

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '1vh' }}>
                <CssBaseline />
                <div style={{ height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography>Unlock Machine Secrets with Precision: White Box Testing Unleashed!</Typography>
                </div>
                <div style={{ overflow: 'scroll', height: '100%' }}>
                    <List sx={{ width: '100%', padding: 0, margin: 0 }} aria-label="contacts">
                        {list()}
                    </List>
                </div>
            </div>
        );
    }
}

export default ChallengeList;