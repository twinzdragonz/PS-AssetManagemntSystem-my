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
		  address : null,
		  postcode : null,
		  phonenumber : null,
		  group : null,
		  companyid : null,
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


componentDidMount()
{
	db.user_info.get(1,function(data) {
		// preset to exist 
		console.log("userName: " + data.userName + ".Token: " + data.token);
		console.log("DATA LIST >>",data);
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
		<FormControl placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
						</InputGroup>
							</td>
							<td></td>
							<td></td>
							<td></td>

				<td>Password</td>
				<td>:</td>
				<td>
					<InputGroup className="mb-3">
						<FormControl placeholder= "Classified" aria-label="Classified" aria-describedby="basic-addon1" />
					</InputGroup>
							</td>
						</tr>
						<tr>
							<td>Group</td>
							<td>:</td>
							<td>
							<InputGroup className="mb-3">
							<FormControl placeholder={this.state.group} aria-label="" aria-describedby="basic-addon1" />
							</InputGroup>
							</td>

							<td></td>
							<td></td>
							<td></td>

							<td>Phone Number </td>
							<td>:</td>
							<td>
						<InputGroup className="mb-3">
						<FormControl placeholder="" aria-label="" aria-describedby="basic-addon1" />
						</InputGroup>
							</td>
						</tr>
						<tr>
							<td>Birth Date</td>
							<td>:</td>
							<td>
							<InputGroup className="mb-3">
							<FormControl placeholder="" aria-label="" aria-describedby="basic-addon1" />
							</InputGroup>
							</td>

							<td></td>
							<td></td>
							<td></td>

							<td>Address </td>
							<td>:</td>
							<td>
						<InputGroup className="mb-3">
						<FormControl placeholder="" aria-label="" aria-describedby="basic-addon1" />
						</InputGroup>
							</td>
						</tr>
						<tr>
							<td>PostCode</td>
							<td>:</td>
							<td>
							<InputGroup className="mb-3">
							<FormControl placeholder="" aria-label="" aria-describedby="basic-addon1" />
							</InputGroup>
							</td>
							<td></td>
							<td></td>
							<td></td>
							<td>Company ID </td>
							<td>:</td>
							<td>
						<InputGroup className="mb-3">
						<FormControl placeholder="" aria-label="" aria-describedby="basic-addon1" />
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


