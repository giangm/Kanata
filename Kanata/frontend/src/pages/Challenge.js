import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Box, Typography, Container, Paper, Button, Accordion, Fab, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Hints from '../components/Hints';
import Solutions from '../components/Solutions';
import axios from 'axios';

import './css/Challenge.css';

const API_ENDPOINT = 'http://localhost:8000/api';

const Challenge = () => {
  const { id } = useParams();
  const [challengeDetails, setChallengeDetails] = useState('');
  const [status, setStatus] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isResetLoading, setIsResetLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Fetch challenge description from API
    const fetchChallengeDetails = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/challengedetails?name=${id}`);
        setChallengeDetails(response.data.description);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchChallengeDetails();
  }, [id]);

  const handlePlayClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus('playing');
    }, 1500);
  };

  const handleStopClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStatus('stopped');
    }, 1000);

    axios.get(`${API_ENDPOINT}/stopchallenge?name=${id}`).then(response => {
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
  };

  return (
    <Container sx={{ py: '4em', height: '100vh', minWidth: '100vw', overflow: 'scroll' }}>
      <Button className="btn-white" component={NavLink} to="/">
        Home
      </Button>
      <Box sx={{ px: '15em' }}>
        <Typography sx={{ textAlign: 'center' }} variant="h1" component="h1" gutterBottom>
          {id}
        </Typography>
        <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
          <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
            <Fab
              color="primary"
              aria-label="add"
              disabled={isLoading}
              sx={{
                mx: 1,
                border: '2px solid white',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'white',
                  '& svg': { color: 'black' },
                },
              }}
              onClick={status === 'playing' ? handleStopClick : handlePlayClick}
            >
              {isLoading ? (
                <div className="loading-icon"></div>
              ) : status === 'playing' ? (
                <StopIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
              ) : (
                <PlayArrowIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
              )}
            </Fab>

            <Fab
              color="error"
              aria-label="restart"
              sx={{
                mx: 1,
                border: '2px solid white',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'white',
                  '& svg': { color: 'black' },
                },
              }}
              onClick={handleResetClick}
              disabled={status !== 'playing'}
            >
              {isResetLoading ? (
                <div className="loading-icon"></div>
              ) : (
                <RestartAltIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
              )}
            </Fab>
            <Fab
              aria-label="favourite"
              sx={{
                mx: 1,
                border: '2px solid white',
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: 'white',
                  '& svg': { color: 'red' },
                },
              }}
              onClick={handleFavClick}
            >
              {isFavorite ? (
                <FavoriteIcon sx={{ color: 'red', transition: 'color 0.3s' }} />
              ) : (
                <FavoriteIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
              )}
            </Fab>
          </Box>
          <Typography sx={{ textAlign: 'left' }} variant="h5" component="h2" gutterBottom>
            Challenge Description
          </Typography>
          <Typography sx={{ textAlign: 'left' }} variant="body1" gutterBottom>
            {challengeDetails}
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
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
            <Typography variant="h6">Video Solution</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Solutions name={id} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default Challenge;
