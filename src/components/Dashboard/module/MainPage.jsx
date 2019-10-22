import React from "react";
import {Alert} from 'react-bootstrap';
var Component = React.Component;

// Put some graph here but.. there is no time D:<
export default class MainPage extends Component{

	render() {
		return(
		<div className="container">
		<br></br>

		
	

		  <Alert variant="success">
			<Alert.Heading>  Welcome to empty Dashboard</Alert.Heading>
			<p>
				Aww yeah, you successfully login. This example
				text is going to run a bit longer so that you can see how spacing within an
				alert works with this kind of content.
			</p>
			<hr />
			<p className="mb-0">
				Whenever you need to, be sure to use margin utilities to keep things nice
				and tidy.
			</p>
        </Alert>

		</div>
		)
	}
}


