import React, { Component } from "react";
import classnames from "classnames";
import ListItem from "./ListItem";
import ListForm from "./ListForm";
import WarningMessage from "../WarningMessage";
import CONSTANTS from "../../constants";
import {Button,Form} from 'react-bootstrap';
import styles from "./Contact_us.css";
import Axios from "axios";
import db from "../Database/db";

export default class Contact_us extends Component {
  constructor(props) {
    super(props);

    this.state = {
     show : false,
     username : "",
     password : "",
     isAuthenticated : false,
     email : "",
     phone_number : "",
     text : "",
     list: [],
     WarningMessageOpen: false,
     WarningMessageText: "Owh my God Somethings Happen"

 };

    this.handleWarningClose = this.handleWarningClose.bind(this);
    this.handleWarningClose = this.handleWarningClose.bind(this);

  }

  // on submit 
  // api call push data into db 

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }


  handleSubmit = event =>{
    console.log("handling submit");
    Axios.post(CONSTANTS.ENDPOINT.URL + CONSTANTS.API.CONTACT_US,{
       req_email : this.state.email,
       req_phone_num : this.state.phone_number,
       req_message : this.state.text

    }).then((response) => {
      console.log(response);
      console.log(response.data);

        if(response.data.resp_code === "00")
          {
            console.log(response.data.resp_code);
            this.setState({
              WarningMessageOpen: true,
              WarningMessageText: `Form Submited`
            })

          }
 
        });


    event.preventDefault();
  }

  handleDeleteListItem(listItem) {
    fetch(`${CONSTANTS.ENDPOINT.LIST}/${listItem._id}`, { method: "DELETE" })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result => {
        let list = this.state.list;
        list = list.filter(item => item._id !== result._id);
        this.setState({ list: list });
      })
      .catch(error => {
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_DELETE} ${error}`
        });
      });
  }

  handleAddListItem(textField) {
    // Warning Pop Up if the user submits an empty message
    if (!textField) {
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText: CONSTANTS.ERROR_MESSAGE.LIST_EMPTY_MESSAGE
      });
      return;
    }

    fetch(CONSTANTS.ENDPOINT.LIST, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: textField
      })
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(result =>
        this.setState(prevState => ({
          list: [result, ...prevState.list]
        }))
      )
      .catch(error =>
        this.setState({
          WarningMessageOpen: true,
          WarningMessageText: `${CONSTANTS.ERROR_MESSAGE.LIST_ADD} ${error}`
        })
      );
  }


  render()
  {
    const {
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return(

      <div className="row">
  <div className="col"></div>


  <div className="col">
    <div className={classnames("", styles.header)}>

         <br></br><br></br>
         <form onSubmit={this.handleSubmit}>
          <Form.Group >
          <Form.Label></Form.Label>
             <Form.Label>Contact Us</Form.Label>
               <Form.Control value={this.state.email}  onChange={this.handleChange} type="email" placeholder="Enter email" />
                  <Form.Text >
                  <Form.Label></Form.Label>
                    <Form.Control value={this.state.phone_number}  onChange={this.handleChange} type="text" placeholder="Enter Phone Number" />
                     <Form.Text ></Form.Text>
                       We'll never share your data with anyone else, We Promise.
                      </Form.Text>
            <Form.Label>Say Something</Form.Label>
            <Form.Control value={this.state.text}  onChange={this.handleChange} as="textarea" rows="3" />
              </Form.Group>

           <Button variant="primary" type="submit">Submit </Button>
          </form>
        </div>
        <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose} />
  </div>
   <div className="col"></div>

     </div>

    );

  }

}
