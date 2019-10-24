import React from "react";
import DataTable from 'react-data-table-component';
import Axios from "axios";
import db from "../../Database/db";
import CONSTANTS from "../../../constants";
import {Button } from 'react-bootstrap';

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
	
	  }

 async componentDidMount()
	{
		let data = await db.user_info.get(1);
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
				this.setState({ data: response.data });
				console.log("USER_MANAGEMENT >> Grab Success");
			}
		})

	}

	render() {


		// Override the row default height
		const DatatableTheme = {
			rows: {
				width: 'fit-content'
			}
		}

		let data = this.state.data;
		const handleChange = (state) => {
			// You can use setState or dispatch with something like Redux so we can use the retrieved data
			console.log('Selected Rows: ', state.selectedRows);
		  };

		  // Toggle the state so React Table Table changes to `clearSelectedRows` are triggered
		const handleClearRows = () => {
			this.setState({ toggledClearRows: !this.state.toggledClearRows})
		};
		const columns = [
			{
			name: 'Id',
			selector: 'id',
			sortable: false,
			},
			{
				name: 'Username',
				selector: 'username',
				sortable: false,

			},
			{
				name: 'Authentication Token',
				selector: 'token',
				sortable: false,

			},
			{
				name: 'GroupID',
				selector: 'group_index',
				sortable: false,

			},
			{
				name: 'RegisterDt',
				selector: 'createdAt',
				sortable: false,

			},
			{
				name: 'UpdateDt',
				selector: 'updatedAt',
				sortable: false,
				align: 'right'
			},
			{
				name : 'Action',
				cell: () => <Button  size="sm" variant="info" onClick={this.handleAction}>Edit</Button>,
				ignoreRowClick: true,
				allowOverflow: true,
				button: true,
		   },

		]

		return(
		<div>
		 <div className="container">
			 <DataTable
		title="Admin Panel"
		columns={columns}
		data={data}
		selectableRows
		onRowSelected={handleChange}
		clearSelectedRows={this.state.toggledClearRows}
		customTheme={DatatableTheme}
	
		/>


		</div>
		</div>
		)
	}
}


