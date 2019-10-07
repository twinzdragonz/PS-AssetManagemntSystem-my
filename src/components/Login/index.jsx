import React, { Component } from "react";
import {  Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Modal,FormGroup,FormControl,FormLabel} from 'react-bootstrap';
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";
import "./Login.css";
import Axios from "axios";
import db from "../Database/db";


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

            var is_exist = false;
            console.log("USER_EXIST",is_exist);
         // find this user
          db.user_info.where("userName").equalsIgnoreCase(this.state.username).each(function (data) {
      
              is_exist = true;
              console.log("USER_EXIST",is_exist);
              // preset to exist 
              console.log("userName: " + data.userName + ".Token: " + data.token);
        
        }).then(() => {
           // if not exist only add
           console.log("USER_EXIST",is_exist);
           if(is_exist === false)
           {
              console.log("username is not exist, inserting now");
                db.user_info.add({
                      //userName,passWord,token,isAuthenticated,userIndex
                      userName : this.state.username,
                      passWord : this.state.password,
                      token    : "TOKEN",
                      isAuthenticated : this.state.isAuthenticated,
                      userIndex : 1
                });
                console.log("username inserted");
          }
        }).catch(function(error){
          console.log(error);
  
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
    
          const redirectToReferrer = this.state.isAuthenticated;
          if (redirectToReferrer === true) {
            console.log("Server agree to Reroute to Dashboard");
              return <Redirect to={{
                pathname: '/Dashboard',
                state: { username : this.state.username,
                        password : this.state.password,
                        token : this.state.token,
                        isAuthenticated : this.state.isAuthenticated }
            }}
    />
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
          <FormGroup controlId="username" bssize="large">
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bssize="large">
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bssize="large"
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
          <p className="text-center">FOR DEMO USE ONLY</p>
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


