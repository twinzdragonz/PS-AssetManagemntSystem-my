import React from "react";
import {Alert,Table,InputGroup,FormControl,Modal,Button,DropdownButton,MenuItem} from 'react-bootstrap';
import styles from "../module/custom.css";
import db from "../../Database/db";

var Component = React.Component;
export default class Profile extends Component{
	constructor(props) {
		super(props);
		this.state = {
		  user_id : null,
		  username :null,
		  password : null,
		  token : null,
		  userIndex : null,
		  phoneNumber : null,
		  birthDate : null,
		  address : null,
		  postcode : null,
		  groupName : null,
		  databaseId : null,
		  salt : null,
		  groupId : null,
		  updatedAt : null,
		  createdAt : null,
		  isAuthenticated : false,
		};
		this.handleWarningClose = this.handleWarningClose.bind(this);
	  }

handleWarningClose() {
	this.setState({
		WarningMessageOpen: false,
		WarningMessageText: ""
	});
}

async componentDidMount()
{
	console.log("PROFILE COMPONENT DID MOUNT >>>>");
	let data = await db.user_info.get(1);
	console.log("PROFILE COMPONENT DID MOUNT >>>>",data);
	this.setState({
		user_id : data.databaseId,
		username :data.userName,
		password : "CLASSIFIED",
		token : data.token,
		userIndex : data.databaseId,
		phoneNumber : data.phoneNumber,
		birthDate : data.birthDate,
		address : data.address,
		postcode : data.postcode,
		groupName : data.groupName,
		databaseId : data.databaseId,
		salt : data.salt,
		groupId : data.groupId,
		updatedAt : data.updatedAt,
		createdAt : data.createdAt
	});

}

	render() {

		return(
			<Modal.Dialog size="lg">
			<Modal.Header >
			<Modal.Title>User Profile UUID : {this.state.user_id}</Modal.Title>
			</Modal.Header>
			<Modal.Body size="lg">
			<p><Table>
			<tr>
			 <td>Username</td>
			 <td>:</td>
			 <td>
			<InputGroup className="mb-3">
		<FormControl value={this.state.username} placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
						</InputGroup>
							</td>
							<td></td>
							<td></td>
							<td></td>

				<td>Password</td>
				<td>:</td>
				<td>
					<InputGroup className="mb-3">
						<FormControl value={this.state.password} placeholder= "Classified" aria-label="Classified" aria-describedby="basic-addon1" />
					</InputGroup>
							</td>
						</tr>
						<tr>
							<td>Group</td>
							<td>:</td>
							<td>
							<InputGroup className="mb-3">
							<FormControl value={this.state.groupName} placeholder={this.state.group} aria-label="" aria-describedby="basic-addon1" />
							</InputGroup>
							</td>

							<td></td>
							<td></td>
							<td></td>

							<td>Phone Number </td>
							<td>:</td>
							<td>
						<InputGroup className="mb-3">
						<FormControl value={this.state.phoneNumber} placeholder="" aria-label="" aria-describedby="basic-addon1" />
						</InputGroup>
							</td>
						</tr>
						<tr>
							<td>Birth Date</td>
							<td>:</td>
							<td>
							<InputGroup className="mb-3">
							<FormControl value={this.state.birthDate} placeholder="" aria-label="" aria-describedby="basic-addon1" />
							</InputGroup>
							</td>

							<td></td>
							<td></td>
							<td></td>

							<td>Address </td>
							<td>:</td>
							<td>
						<InputGroup className="mb-3">
						<FormControl value={this.state.address} placeholder="" aria-label="" aria-describedby="basic-addon1" />
						</InputGroup>
							</td>
						</tr>
						<tr>
							<td>PostCode</td>
							<td>:</td>
							<td>
							<InputGroup className="mb-3">
							<FormControl  value={this.state.postcode} placeholder="" aria-label="" aria-describedby="basic-addon1" />
							</InputGroup>
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td>Company ID </td>
							<td>:</td>
							<td>
						<InputGroup className="mb-3">
						<FormControl  value={this.state.userIndex} placeholder="" aria-label="" aria-describedby="basic-addon1" />
						</InputGroup>
							</td>
						</tr>
				  </Table>
                </p>
			</Modal.Body>
			<Modal.Footer>

			<Button variant="primary">Update</Button>
			</Modal.Footer>
			</Modal.Dialog>

		)
	}
}


