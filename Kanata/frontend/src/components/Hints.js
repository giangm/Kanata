import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

class Hints extends Component {
	constructor(props) {
		super(props);
		this.props = props
	}

	state = {
		data: [],
	};

	componentDidMount() {
        axios.get(`http://localhost:8000/api/challengehint?name=${this.props.name}`).then(response => {
            this.setState({ data: response.data});
			console.log(this.state.data);
			/*
            console.log(this.state.data["data"]["0"]["0"]) */
        })
    }

	render() {
		return (
			<div style={{ textAlign: 'left', overflow: 'scroll'}}>
				<ReactMarkdown>{""+this.state.data["data"]}</ReactMarkdown>
			</div>
		);
	}
}

export default Hints;