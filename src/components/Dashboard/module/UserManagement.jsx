import React from "react";
import DataTable from 'react-data-table-component';
import Axios from "axios";
import db from "../../Database/db";
import CONSTANTS from "../../../constants";

var Component = React.Component;
export default class UserManagement extends Component{
	constructor(props) {
		super(props);
		this.state = {
		 username : null,
		 token : null,
		  data: [],
		  WarningMessageOpen: false,
		  WarningMessageText: ""
		};
		this.proc = this.proc.bind(this);
	  }

	proc()
	{
		db.user_info.get(1,function(data) {
		// preset to exist
		console.log("DATA LIST >>",data);
		console.log("userName: " + data.userName + ".Token: " + data.token);

		console.log("USER MANAGEMENT >>> handling submit");
		console.log("USER MANAGEMENT >>>",(CONSTANTS.ENDPOINT.URL + CONSTANTS.API.USER_LIST));
		Axios.post(CONSTANTS.ENDPOINT.URL + CONSTANTS.API.USER_LIST,
        {
		req_username : data.userName
		},
		{
		   headers: {'token': data.token}
		}

		).then((response) => {

		console.log(response);
		console.log(response.data);

			if(response.data != null)
			{
				this.setState.data = response.data;
				console.log("USER_MANAGEMENT >> Grab Success");
			}
		})
	});

	}

	render() {

		this.proc();

		const data = this.state.data;
		const columns = [
			{
			name: 'Id',
			selector: 'id',
			sortable: true,
			},
			{
				name: 'Username',
				selector: 'username',
				sortable: true,

			}
		]

		return(
		<div>
		 <div className="container">
			 <DataTable
		title="Admin Panel"
		columns={columns}
		data={data}
		/>

	
		</div>
		</div>
		)
	}
}


