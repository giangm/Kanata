// import React, { useEffect, useState } from 'react';

// import { Divider, Stack } from '@mui/material';
// import { useParams } from 'react-router-dom';

// import TabsSection from './TabsSection';
// import axios from 'axios';

// function Challenge(match) {
// 	const [challenge, setChallenge] = useState(null);
// 	const { id } = useParams();

// 	useEffect(()=>{
// 		const fetchChallenge = async () => {
// 			/* const result = await axios.get(`/challenge/${id}`); 
// 			setChallenge(result.data);*/
// 		};

// 		fetchChallenge();
// 	}, [id]);

// 	const codeString = `import React from "react";
// 	import uniquePropHOC from "./lib/unique-prop-hoc";

// 	// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

// 	class Expire extends React.Component {
// 		constructor(props) {
// 			super(props);
// 			this.state = { component: props.children }
// 		}
// 		componentDidMount() {
// 			setTimeout(() => {
// 				this.setState({
// 					component: null
// 				});
// 			}, this.props.time || this.props.seconds * 1000);
// 		}
// 		render() {
// 			return this.state.component;
// 		}
// 	}

// 	export default uniquePropHOC(["time", "seconds"])(Expire);
// 	class Expire extends React.Component {
// 		constructor(props) {
// 			super(props);
// 			this.state = { component: props.children }
// 		}
// 		componentDidMount() {
// 			setTimeout(() => {
// 				this.setState({
// 					component: null
// 				});
// 			}, this.props.time || this.props.seconds * 1000);
// 		}
// 		render() {
// 			return this.state.component;
// 		}
// 	}

// 	export default uniquePropHOC(["time", "seconds"])(Expire);
// 	class Expire extends React.Component {
// 		constructor(props) {
// 			super(props);
// 			this.state = { component: props.children }
// 		}
// 		componentDidMount() {
// 			setTimeout(() => {
// 				this.setState({
// 					component: null
// 				});
// 			}, this.props.time || this.props.seconds * 1000);
// 		}
// 		render() {
// 			return this.state.component;
// 		}
// 	}

// 	export default uniquePropHOC(["time", "seconds"])(Expire);
// 	`;

// 	return (
// 		<div style={{ border: "2px solid red" }}>
// 			<Stack direction="row" divider={<Divider orientation="vertical" sx={{ width: "2px" }} flexItem />}>
// 				<div style={{ backgroundColor: 'black', flex: 1, padding: "1em" }}>
// 					<TabsSection name/>
// 				</div>
// 				{/* <div style={{ flex: 1, padding: "1em", maxHeight: "100vh", overflow: "auto" }}>
// 					<SyntaxHighlighter language={javascript} style={darcula} showLineNumbers={true} wrapLongLines={true} customStyle={{ backgroundColor: "#252525" }}>
// 						{codeString}
// 					</SyntaxHighlighter>
// 				</div> */}
// 			</Stack>
// 		</div>
// 	);
// }

// export default Challenge;


import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Container, Paper, Button, Accordion, Fab, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Hints from '../components/Hints';
import Solutions from '../components/Solutions';

export default function Challenge() {
    const { id } = useParams();

    return (
        <Container maxWidth="md" sx={{paddingTop: '2em', display: 'flex', height: '100vh', width: "100vw", overflow: 'scroll' }}>
            <Box>
                <Typography sx={{ textAlign: 'center' }} variant="h1" component="h1" gutterBottom>
                    {id}
                </Typography>
                <Paper elevation={3} sx={{ p: 2, position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                        <Fab color="primary" aria-label="add" sx={{
                            mx: 1,
                            border: '2px solid white',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'white',
                                '& svg': {
                                    color: 'black',
                                },
                            },
                        }}>
                            <PlayArrowIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
                        </Fab>
                        <Fab color="error" aria-label="restart" sx={{
                            mx: 1,
                            border: '2px solid white',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'white',
                                '& svg': {
                                    color: 'black',
                                },
                            },
                        }}>
                            <RestartAltIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
                        </Fab>
                        <Fab color="secondary" aria-label="favourite" sx={{
                            mx: 1,
                            border: '2px solid white',
                            backgroundColor: 'transparent',
                            '&:hover': {
                                backgroundColor: 'white',
                                '& svg': {
                                    color: 'black',
                                },
                            },
                        }}>
                            <FavoriteIcon sx={{ color: 'white', transition: 'color 0.3s' }} />
                        </Fab>
                    </Box>
                    <Typography sx={{ textAlign: 'left' }} variant="h5" component="h2" gutterBottom>
                        Challenge Description
                    </Typography>
                    <Typography sx={{ textAlign: 'left' }} variant="body1" gutterBottom>
                        This is where the challenge description goes...
                    </Typography>
                </Paper>

                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">Hints</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Hints name={id}/>
                    </AccordionDetails>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">Solutions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Solutions name={id}/>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Container>
    );
}
