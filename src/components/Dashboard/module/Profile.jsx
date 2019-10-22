import React from "react";
import {Alert,Table} from 'react-bootstrap';



var Component = React.Component;
export default class Profile extends Component{

	render() {
		return(
		<div className = "container">
			<br></br>
		 <Table responsive>
		<thead>
		<tr>
			<th></th>
			<th></th>
			<th></th>
			<th></th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td>Username</td>
			<td>Mark</td>
			<td>Otto</td>
			<td>@mdo</td>
		</tr>
		<tr>
			<td></td>
			<td></td>
			<td></td>
			<td>@</td>
		</tr>
		<tr>
			<td>3</td>
			<td colSpan="2">Larry the Bird</td>
			<td>@twitter</td>
		</tr>
		</tbody>
		</Table>
		</div>
		)
	}
}


