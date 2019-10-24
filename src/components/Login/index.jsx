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
            console.log(response.data.resp_token);

            this.setState({
                  isAuthenticated: true,
                  username : response.data.resp_username,
                  password : response.data.resp_password,
                  token: response.data.resp_token,
                  userIndex : response.data.resp_id,
                  phoneNumber : response.data.resp_phone_number,
                  birthDate : response.data.resp_birth_date,
                  address : response.data.resp_address,
                  postcode : response.data.resp_postcode,
                  groupName : response.data.resp_group_name,
                  databaseId : response.data.resp_id,
                  salt : response.data.resp_salt,
                  groupId : response.data.resp_group_id,
                  updatedAt : response.data.resp_updatedAt,
                  createdAt : response.data.resp_createdAt,
            });

             console.log("CURRENT TOKEN >>>",this.state.token);

            var is_exist = false;
            console.log("USER_EXIST",is_exist);

         // find this user
              db.user_info.where("userName").equalsIgnoreCase(this.state.username).each(function (data) {

              is_exist = true;
              console.log("USER_EXIST",is_exist);


        }).then(() => {
           // if not exist only add
           console.log("USER_EXIST",is_exist);
           if(is_exist === false)
           {
              console.log("username is not exist, inserting now");
                db.user_info.add({
                      userName : this.state.username,
                      passWord : this.state.password,
                      token    : this.state.token,
                      isAuthenticated : true,
                      userIndex : this.state.userIndex,
                      phoneNumber : this.state.phoneNumber,
                      birthDate : this.state.birthDate,
                      address : this.state.address,
                      postcode : this.state.postcode,
                      groupName : this.state.groupName,
                      databaseId : this.state.databaseId,
                      salt : this.state.salt ,
                      groupId : this.state.groupId,
                      updatedAt : this.state.updatedAt,
                      createdAt : this.state.createdAt
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
                    isAuthenticated : this.state.isAuthenticated

                  }
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


