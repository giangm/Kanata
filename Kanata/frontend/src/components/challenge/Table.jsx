import React from 'react'
import { Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import { Typography, Accordion, AccordionSummary, AccordionDetails, Container, Paper, Fab } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import RestartAltIcon from '@mui/icons-material/RestartAlt'

import Hints from '@/components/challenge/Hints'

import { fetchInformation, requestStop } from '@/api/Api'
import { SECTIONS } from '@/constants/constants'

class Table extends React.Component {
  state = {
    data: {},
    loading: false,
    favourite: false,
    status: "stopped",
    resetting: false
  }

  names = window.location.pathname.split('/')

  componentDidMount = async () => {
    const data = await fetchInformation(this.names[this.names.length - 1])
    return this.setState({ data: data })
  }

  handlePlay = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      this.setState({ status: "running" });
    }, 1500);
  }

  handleStop = () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      this.setState({ loading: false });
      await requestStop(this.names[this.names.length - 1]) && this.setState({ status: "stopped"})
    }, 1000);

  }

  handleReset = () => {
    this.setState({ resetting: true });
    setTimeout(() => {
      this.setState({ resetting: false });
    }, 1500);
  };

  handleFavourite = () => this.setState((prevState) => ({ favourite: !prevState.favourite }))

  accordions = () => {
    return SECTIONS.map((item, key) => (
      <Accordion key={key}>
        <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">{item}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {item === "Hints" && <ReactMarkdown>{this.state.data["hints"]}</ReactMarkdown>}
          {item === "Written Solution" && <ReactMarkdown>{this.state.data["solution"]}</ReactMarkdown>}
          {/* {item === "Video Solution" && <VideoSolution />} */}
        </AccordionDetails>
      </Accordion>
    ))
  }

  render() {
    return (
      <>
        {
          false ? <Navigate to="/404" replace /> : (
            <Container maxWidth="lg" className="h-75 my-5">
              <Paper elevation={3} className="p-4 flex-between">
                <div>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Challenge Description
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {/* {this.state.data["information"]["name"]} */}
                    {/* {console.log(this.state.data["information"]["name"])} */}
                  </Typography>
                </div>
                <div>
                  <Fab color="primary" aria-label="add" sx={{ mx: 1 }} onClick={this.state.status === "running" ? this.handleStop : this.handlePlay}>
                    {this.state.loading ? (
                      <div className="loading-icon"></div>
                    ) : this.state.status === "running" ? (
                      <StopIcon />
                    ) : (
                      <PlayArrowIcon />
                    )}
                  </Fab>
                  <Fab aria-label="restart" sx={{ mx: 1 }} disabled={this.state.status !== "running"} onClick={this.handleReset}>
                    {this.resetting ? (
                      <div className="loading-icon"></div>
                    ) : (
                      <RestartAltIcon />
                    )}
                  </Fab>
                  <Fab aria-label="favourite" sx={{ mx: 1 }} onClick={this.handleFavourite}>
                    {this.state.favourite ? <FavoriteIcon className="text-error" /> : <FavoriteIcon />}
                  </Fab>
                </div>
              </Paper>
              {this.accordions()}
            </Container>
          )
        }
      </>
    )
  }
}

export default Table