import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Typography, Accordion, AccordionSummary, AccordionDetails, Container, Paper, Fab } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import StopIcon from '@mui/icons-material/Stop'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

import { fetchInformation, requestStart, requestStop, requestFavourite, requestComplete } from '@/api/Api'
import { SECTIONS } from '@/constants/constants'

class Table extends React.Component {
  state = {
    data: {},
    loading: false,
    favourite: false,
    status: "stopped",
    resetting: false,
    complete: false,
    url: ''
  }

  names = window.location.pathname.split('/')

  componentDidMount = async () => {
    const data = await fetchInformation(this.names[this.names.length - 1])
    this.setState({ data: data, favourite: data["favourite"], status: data["status"], url: data["url"] })
    console.log(this.state.url)
  }

  handlePlay = () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      this.setState({ loading: false });
      await requestStart(this.names[this.names.length - 1]) && this.setState({ status: "running" });
    }, 1500);
  }

  handleStop = () => {
    this.setState({ loading: true });
    setTimeout(async () => {
      this.setState({ loading: false });
      await requestStop(this.names[this.names.length - 1]) && this.setState({ status: "stopped" });
    }, 1000);
  }

  handleReset = () => {
    this.setState({ resetting: true });
    setTimeout(() => {
      this.setState({ resetting: false });
    }, 1500);
  };

  handleFavourite = async () => await requestFavourite(this.names[this.names.length - 1], !this.state.favourite) && this.setState({ favourite: !this.state.favourite })

  handleComplete = async () => await requestComplete(this.names[this.names.length - 1], !this.state.complete) && this.setState({ complete: !this.state.complete })

  accordions = () => {
    return SECTIONS.map((item, key) => (
      <Accordion key={key}>
        <AccordionSummary expandIcon={<ExpandMoreIcon className="text-white" />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography variant="h6">{item}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {item === "Hints" && <ReactMarkdown className="prose max-w-full">{this.state.data["hints"]}</ReactMarkdown>}
          {item === "Written Solution" && <ReactMarkdown className="prose max-w-full" components={this.renderers}>{this.state.data["solution"]}</ReactMarkdown>}
          {item === "Video Solution" && this.state.data["url"] && ( // Only render if video URL is available
            <div className="youtube-video-container">
              <iframe
                title="YouTube Video Solution"
                width="100%"
                height="400"
                src={this.state.data["url"]}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    ))
  }

  render() {
    return (
      <>
        <Container maxWidth="lg" className="h-75 my-5">
          <Paper elevation={3} className="p-4 flex-between">
            <div>
              <Typography variant="h5" component="h2" gutterBottom>
                Challenge Description
              </Typography>
              {this.state.data && (<Typography variant="body1" gutterBottom>{this.state.data["desc"]}</Typography>)}
              <br/>
              <Typography variant="h5" component="h3" gutterBottom>
                Connection Info
              </Typography>
              <Typography variant="body1" gutterBottom>http://localhost:{this.state.data["connection"]}</Typography>
            </div>
            <div>
              <Fab color="primary" aria-label="add" sx={{ mx: 1 }} onClick={this.state.status === "running" ? this.handleStop : this.handlePlay}>
                {this.state.loading ? (<div className="loading-icon"></div>) : this.state.status === "running" ? (<StopIcon />) : (<PlayArrowIcon />)}
              </Fab>
              <Fab aria-label="restart" sx={{ mx: 1 }} disabled={this.state.status !== "running"} onClick={this.handleReset}>
                {this.resetting ? (<div className="loading-icon"></div>) : (<RestartAltIcon />)}
              </Fab>
              <Fab aria-label="favourite" sx={{ mx: 1 }} onClick={this.handleFavourite}>
                {this.state.favourite ? <FavoriteIcon className="text-error" /> : <FavoriteIcon />}
              </Fab>
              <Fab aria-label="complete" sx={{ mx: 1 }} onClick={this.handleComplete}>
                {this.state.complete ? <TaskAltIcon className="text-success" /> : <TaskAltIcon />}
              </Fab>
            </div>
          </Paper>
          {this.accordions()}
        </Container>
      </>
    )
  }
}

export default Table
