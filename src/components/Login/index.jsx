import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Modal} from 'react-bootstrap';
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";

export default class Login extends Component {
  constructor(props)
  {
    super(props);
       this.state = {
        show : false,
        username : '',
        password : '',
        WarningMessageOpen: false,
        WarningMessageText: ""
    
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // when user key in somehting send here
  handleChange(event)
  {
    this.setState({username : event.target.username})
    this.setState({password : event.target.password})

  }
   // when user press button set here
  handleSubmit(event)
  {

    alert('A name was submitted: ' + this.state.username);
    event.preventDefault();
  
/*
    fetch(CONSTANTS.ENDPOINT.URL+ CONSTANTS.API.LOGIN ,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(response =>{
      if(!response.ok)
         {
           throw Error(response.statusText);
         }
         return response.json();

    }) .catch(error =>
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText: `${
          CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET
        } ${error}`
      })
    );
    */
  }


  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

     render() {

      const handleClose = () => this.setState({
        show : false
      })
      const handleShow = () => this.setState({
        show : true
      })
    
       return (
        <React.Fragment>
        <Button variant="success" size="sm" onClick={handleShow}>
        Login
      </Button>

      <Modal show={this.state.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in to start your session</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
    <div class="form-group ">
          <input type="text" value={this.state.username} onChange={this.handleChange} class="form-control" placeholder="Username" id="Username" name="Username"></input>
     </div>

     <div class="form-group ">
          <input type="password" value ={this.state.password } onChange={this.handleChange} class="form-control" placeholder="Password" id="Password" name="password"></input>
          </div>
        <div class="d-flex justify-content-end">
            <input type="submit" value="Login" class="btn btn-success "/>
         </div>
          </form>

          </Modal.Body>
        <Modal.Footer>
          <p class="text-center">FOR DEMO USE ONLY</p>         
        </Modal.Footer>
      </Modal>
      </React.Fragment>          
      );
    }
    

}


