import React from "react";
import DataTable from 'react-data-table-component';
var Component = React.Component;



export default class AdminPanel extends Component{


	render() {
		const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' },{
			id:2 , title:"Doreamon",year:'2019'
		}];
		const columns = [
		{
		name: 'Title',
		selector: 'title',
		sortable: true,
		},
		{
			name: 'Year',
			selector: 'year',
			sortable: true,
			right: true,
			},
		];

		return(
		<div className="container">
		
			<DataTable
        title="Admin Panel"
        columns={columns}
        data={data}
      />
		</div>
		)
	}
}


