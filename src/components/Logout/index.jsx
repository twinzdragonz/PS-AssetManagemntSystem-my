import React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Modal,FormGroup,FormControl,FormLabel} from 'react-bootstrap';
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";
import "./Logout.css";
import Axios from "axios";


export default class Logout extends Component {
  constructor(props)
  {
    super(props);
       this.state = {

    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
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
              isAuthenticated:false
            });

          }

    }).catch(function(error){
        console.log(error);

    });

    event.preventDefault();
  }

   handleLoginClick() {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick() {
    this.setState({isLoggedIn: false});
  }

     render() {
     
      if(!this.state.isAuthenticated){
        console.log("User authenticated successfully");
       return <Redirect exact path="/Homepage" to="/Homepage"/>
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
    
      <Button variant="danger" size="sm" onClick={handleShow}>  Logout  </Button>
    
    
      <Modal show={this.state.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Log Out</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <form onSubmit={this.handleSubmit}>
        
          <Button
            block
            bsSize="large"
            type="submit"
          >
            Logout
          </Button>
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


