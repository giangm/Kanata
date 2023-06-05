import React from 'react';
import axios from 'axios';
import { NavLink } from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import PestControlIcon from '@mui/icons-material/PestControl';

import './css/ChallengeList.css'

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
        axios.get("http://localhost:8000/api/challengelist").then(response => {
            this.setState({ data: response.data["data"] });
            //console.log(response.data);
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
            Object.entries(data).map((key, index) => {
                const c = this.state.cardColors[index % this.state.cardColors.length]
                const isExpanded = index === this.state.expandedCardIndex;
                const backgroundColor = isExpanded ? this.state.cardColors[index % this.state.cardColors.length][1] : 'transparent';
                const cardInnerColor = isExpanded ? 'black' : 'white'
                challenges.push(
                    <ListItem key={key} component={NavLink} to={`/challenge/${data["" + index]["2"]}`}>
                        <Card sx={{ border: 1, borderColor: c[0], p: 2 }} style={{ backgroundColor: backgroundColor, width: "100%", minWidth: 1000 }}
                            onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={this.handleMouseLeave}>
                            <div style={{ display: "flex", justifyContent: "left", alignItems: "center", gap: 20 }}>
                                <Avatar sx={{ backgroundColor: c[1] }}>
                                    <PestControlIcon />
                                </Avatar>
                                <Typography variant="body1" color={cardInnerColor} size="sm" style={{ flex: "1" }}>{data["" + index]["2"]}</Typography>
                                <Typography variant="body1" color={cardInnerColor} style={{ flex: "1" }}>{data["" + index]["1"]}</Typography>
                                <CheckCircleOutlineIcon sx={{ color: cardInnerColor }} />
                                <PanoramaFishEyeIcon sx={{ color: cardInnerColor }} />
                            </div>
                        </Card>
                    </ListItem>
                );
            });
            return challenges;
        };

        return (
            <div className="container">
                <CssBaseline />
                <div style={{ height: '10vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant='h1'>Unlock Machine Secrets with Precision: White Box Testing Unleashed!</Typography>
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

/* const list = () => {
    const challenges = [];
    Object.keys(data).map((key, index) => {
        const c = this.state.cardColors[index % this.state.cardColors.length]
        const isExpanded = index === this.state.expandedCardIndex;
        const backgroundColor = isExpanded ? this.state.cardColors[index % this.state.cardColors.length][1] : 'transparent';
        const cardInnerColor = isExpanded ? 'black' : 'white'
        challenges.push(
            <ListItem key={key} component={NavLink} to={`/challenge/${data["data"][""+index]["2"]}`}>
                <Card sx={{ border: 1, borderColor: c[0] , p: 2}} style={{ backgroundColor: backgroundColor }}
                    
                    onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={this.handleMouseLeave}>
                    <Stack spacing={20} direction="row" alignItems="center">
                        <Avatar sx={{ backgroundColor: c[1] }}>
                            <PestControlIcon />
                        </Avatar>
                        <Typography variant='body1' color={cardInnerColor} size="sm">{data["data"][""+index]["2"]}</Typography>
                        <Typography variant='body1' color={cardInnerColor}>{data["data"][""+index]["1"]}</Typography>
                        <CheckCircleOutlineIcon sx={{ color: cardInnerColor }} />
                        <PanoramaFishEyeIcon sx={{ color: cardInnerColor }} />
                    </Stack>
                </Card>
            </ListItem>
        );
    });
    return challenges;
};
 */