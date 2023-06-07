import React from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class Solutions extends React.Component{

	constructor(props) {
		super(props);
		this.props = props
	}

	state = {
		data: [],
	};

	m = "![alt_text](https://example.com/image.jpg)"

	// renderers = {
	// 	image: ({ src, alt }) => <img src={src} alt={alt} />,
	// }

	componentDidMount() {
        axios.get(`http://localhost:8000/api/challengesolution?name=${this.props.name}`).then(response => {
            this.setState({ data: response.data});
			console.log(this.state.data);
			/*
            console.log(this.state.data["data"]["0"]["0"]) */
        })
    }

	render() {
		return (
			<div style={{ textAlign: 'left', overflow: 'scroll', height: '50vh'}}>
				<ReactMarkdown components={{img:({node,...props})=><img style={{maxWidth: '65%'}}{...props}/>}}>{""+this.state.data["data"]}</ReactMarkdown>
			</div>
		);
	}
		
	
};

export default Solutions;

