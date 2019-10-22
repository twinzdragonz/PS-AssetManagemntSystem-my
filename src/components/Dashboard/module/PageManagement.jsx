import React from "react";
import {Jumbotron,Button} from 'react-bootstrap';
var Component = React.Component;

export default class PageManagement extends Component{

	render() {
		return(
		<div className="container">
			<br></br>
	   <Jumbotron>
			<h1>Page Management!</h1>
			<p>
			This is a simple  unit, 
			</p>
			<p>
			<Button variant="primary">Learn more</Button>
			</p>
			</Jumbotron>
		</div>
		)
	}
}


