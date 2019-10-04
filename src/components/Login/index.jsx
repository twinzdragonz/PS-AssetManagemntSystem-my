import React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Modal,FormGroup,FormControl,FormLabel} from 'react-bootstrap';
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";
import "./Login.css";
import Axios from "axios";


export default class Login extends Component {
  constructor(props)
  {
    super(props);
       this.state = {
        show : false,
        username : "",
        password : "",
        WarningMessageOpen: false,
        WarningMessageText: "",
        isAuthenticated : false

    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }


  handleSubmit = event =>{
    console.log("handling submit");
    Axios.post(CONSTANTS.ENDPOINT.URL + CONSTANTS.API.LOGIN,{
       req_username : this.state.username,
       req_password : this.state.password

    }).then((response) => {
      console.log(response);
      console.log(response.data);

        if(response.data.resp_code === "00")
          {
            console.log(response.data.resp_code);
            this.setState({
              isAuthenticated:true
            });

          }

    }).catch(function(error){
        console.log(error);

    });

    event.preventDefault();
  }





  /*
   // when user press button set here
  handleSubmit = event => {
    //CONSTANTS.ENDPOINT.URL + CONSTANTS.SYSTEM.CALL
    fetch(CONSTANTS.ENDPOINT.URL + CONSTANTS.API.LOGIN,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        req_username: this.state.username,
        req_password: this.state.password
      })

      
    })
    .then(response =>{
      if(!response.ok)
         {
          this.setState({
            WarningMessageOpen: true,
            WarningMessageText: 'Fail to Login, Please try again'});
         }
         else{
           var iresp = data:findresponse.iresp;

          this.setState({
            WarningMessageOpen: true,
            WarningMessageText: 'Login success, Redirecting..'});
         }
         return response.json();

    }).then((data) => {
      this.setState({ todos: data })
      console.log(this.state.todos)

    }).catch(error =>
      this.setState({
        WarningMessageOpen: true,
        WarningMessageText: `${
          CONSTANTS.ERROR_MESSAGE.LOGIN_GET
        } ${error}`
      })
    );

    event.preventDefault();
  }

  */

     render() {
      if(this.state.isAuthenticated){
        console.log("User authenticated successfully");
       return <Redirect to={{
          pathname: '/Blank',
          state: { 
                   username : this.state.username,
                   password : this.state.password,
                   isAuthenticated: this.state.isAuthenticated,
                   token    : "SOME RANDOM TOKEN LEL",

              }
      }}  />

    }

      const handleClose = () => this.setState({
        show : false
      })
      const handleShow = () => this.setState({
        show : true
      })

      const {
        WarningMessageOpen,
        WarningMessageText
      } = this.state;

       return (
        <React.Fragment>
       <Button variant="success" size="sm" onClick={handleShow}>  Login  </Button>

      <Modal show={this.state.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in to start your session</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          { console.log(this.state.username) }
          { console.log(this.state.username) }
        </form>

          </Modal.Body>
        <Modal.Footer>
          <p class="text-center">FOR DEMO USE ONLY</p>
          <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
        </Modal.Footer>
      </Modal>

      </React.Fragment>
      );
    }
}


