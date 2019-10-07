import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import {Button , Modal} from 'react-bootstrap';
import CONSTANTS from "../../constants";
import WarningMessage from "../WarningMessage";
import "./Logout.css";
import Axios from "axios";
import db from "../Database/db";


export default class Logout extends Component {
  constructor(props)
  {
    super(props);
       this.state = {
         username : null,
         password : null,
         token : null,
         isAuthenticated : null

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

componentDidMount()
{
  this.getUserInfo();
}

componentWillMount()
{
  this.getUserInfo();
}

componentWillUpdate()
{
  this.getUserInfo();
  
}

componentDidUpdate()
{
  console.log("COMPONENT_DID_UPDATE",this.state.username);
  if(this.state.username === null)
  {
      this.getUserInfo();
     console.log("COMPONENT_DID_UPDATE",this.state.username);
   //  this.forceUpdate();
  }

}

 async getUserInfo()
 {
   try{

   if(this.state.username === null){
     var user_info = await db.user_info.orderBy("id").reverse().limit(1).toArray();
     this.setState({
      username : user_info[0]['userName'],
      password : user_info[0]['passWord'],
      isAuthenticated : user_info[0]['isAuthenticated'],
      token : user_info[0]['token']
    });


  }
  }catch(ex)
  {
    console.log(ex);
  }

      return user_info;
 }




  handleSubmit = event =>{

    console.log("handling submit");

    console.log(this.state.username);
    console.log( this.state.password);
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
              
              
              db.delete().then(() => {
                console.log("Database successfully deleted");
                }).catch((err) => {
                console.error("Could not delete database");
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

      // logout 

      const redirectToReferrer = this.state.isAuthenticated;
      if (redirectToReferrer === false) {
        console.log("Server agree to Reroute to MainPage");
         // javascript way to redirect into Homepage 
          var cur_url = window.location.href;
          // remove everything after slash /
          cur_url = cur_url.substring(0, cur_url.indexOf('/'));
             // window location now append 
          window.location.replace(cur_url+"/Homepage");

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


