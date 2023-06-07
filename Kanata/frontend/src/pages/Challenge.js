import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Paper, Button, Accordion, Fab, AccordionSummary, AccordionDetails } from '@mui/material';
import { NavLink } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Hints from '../components/Hints';
import Solutions from '../components/Solutions';
import axios from 'axios';


import './css/Challenge.css';

export default function Challenge() {

  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResetLoading, setIsResetLoading] = React.useState(false);
  const [isRunning, setIsRunning] = React.useState(false);

  const [isFavorite, setIsFavorite] = React.useState(false);

  const handlePlayClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRunning(true);
    }, 1500);
  };

  const handleStopClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsRunning(false);
    }, 1000);
  
    axios.get(`http://localhost:8000/api/stopchallenge?name=${id}`).then(response => {
      console.log(response);
    });
  };

  const handleResetClick = () => {
    setIsResetLoading(true);
    setTimeout(() => {
      setIsResetLoading(false);
    }, 1500);
  };

  const handleFavClick = () => {
    setIsFavorite(isFavorite => !isFavorite);
  }

  return (
    <Container sx={{ py: '4em', height: '100vh', minWidth: "100vw", overflow: 'scroll' }}>
      <Button className="btn-white" component={NavLink} to="/">
        Home
      </Button>
      <Box sx={{ px: '15em' }}>
        <Typography sx={{ textAlign: 'center' }} variant="h1" component="h1" gutterBottom>
          {id}
        </Typography>
        <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Fab color="primary" aria-label="add" disabled={isLoading}
              sx={{ mx: 1, border: '2px solid white', backgroundColor: 'transparent', '&:hover': {
                  backgroundColor: 'white', '& svg': { color: 'black', },},}}
              onClick={isRunning ? handleStopClick : handlePlayClick}>
              {isLoading ? (
                <div className="loading-icon"></div>
              ) : isRunning ? (
                <StopIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
              ) : (
                <PlayArrowIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
              )}
            </Fab>

            <Fab color="error" aria-label="restart" sx={{ mx: 1, border: '2px solid white', backgroundColor: 'transparent',
                '&:hover': { backgroundColor: 'white', '& svg': { color: 'black', },},}} onClick={handleResetClick} disabled={!isRunning}>
              {isResetLoading ? (<div className="loading-icon"></div>): (<RestartAltIcon sx={{ color: 'white', transition: 'color 0.3s' }} />)}
            </Fab>
            <Fab aria-label="favourite"
              sx={{ mx: 1, border: '2px solid white', backgroundColor: 'transparent', '&:hover': { 
                backgroundColor: 'white', '& svg': { color: 'red', },},}} onClick={handleFavClick}>
              {isFavorite ? (<FavoriteIcon sx={{ color: 'red', transition: 'color 0.3s' }} />) : (<FavoriteIcon sx={{ color: 'white', transition: 'color 0.3s' }} />)}
             
            </Fab>
          </Box>
          <Typography sx={{ textAlign: 'left' }} variant="h5" component="h2" gutterBottom>
            Challenge Description
          </Typography>
          <Typography sx={{ textAlign: 'left' }} variant="body1" gutterBottom>
            This is where the challenge description goes...
          </Typography>
        </Paper>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="h6">Hints</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Hints name={id} />
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography variant="h6">Written Solution</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Solutions name={id} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
            <Typography variant="h6">Video Solution</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Solutions name={id} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
}
