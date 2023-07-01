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

	render() {
		return (
			<div style={{ textAlign: 'left', overflow: 'scroll'}}>
				<ReactMarkdown>{""+this.props.hints}</ReactMarkdown>
			</div>
		);
	}
}

export default Hints;