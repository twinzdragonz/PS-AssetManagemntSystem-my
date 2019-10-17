import React, { Component } from "react";
import classnames from "classnames";
import styles from "./masterdetail.module.css";
import CONSTANTS from "../../constants";
import {Button , Modal,FormGroup,FormControl,FormLabel,Container,Row,Col} from 'react-bootstrap';
import MasterDetailPage from "./MasterDetailPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faUsersCog,faPager,faCogs, faIdCard, faBalanceScale, faTools, faAssistiveListeningSystems, faCog } from "@fortawesome/free-solid-svg-icons";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// import module page 

import MainPage from "./module/MainPage";
import AdminPanel from "./module/AdminPanel";
import PageManagement from "./module/PageManagement";
import ProductManagement from "./module/ProductManagement";
import Profile from "./module/Profile";
import Reports from "./module/Reports";
import Settings from "./module/Settings";
import UserManagement from "./module/UserManagement";


export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentDisplayTabIndex: 0,

      username :null,
      password : null,
      token : null,
      isAuthenticated : false,

      masterDetailText: [
        {
          shortDescription: "",
          longDescription: "",
          title: "",
          status: "",
          shipTo: "",
          orderTotal: 0.0,
          orderDate: "",
          id: 0
        }
      ],

         // page render initialize

         on_show_Dashboard : false,
         on_show_Profile : false,
         on_show_UserManagement : false,
         on_show_ProductManagement : false,
         on_show_PageManagement : false,
         on_show_Reports : false,
         on_show_Settings : false,
         on_show_AdminPanel :false



    };
    this.handleDisplayTabClick = this.handleDisplayTabClick.bind(this);
    this.handleWarningClose = this.handleWarningClose.bind(this);
  }
// this is how u call from login : this.props.location.state.username
  // Get the sample data from the back end
  // complicated enough to learn the life cycle
  componentDidMount() {
    console.log("DASHBOARD NAME BEFORE :",this.state.username);

      //this.dataFetch();
      try{

        this.setState({
          username :this.props.location.state.username,
          password : this.props.location.state.password,
          isAuthenticated : this.props.location.state.isAuthenticated,
          token : this.props.location.state.token
        });
        console.log("DASHBOARD NAME AFTER:",this.state.username);   

      }catch(Ex)
      {

        console.log(Ex);
        console.log("Server Violation, Reroute to MainPage");
        console.log("Server agree to Reroute to MainPage");
           // javascript way to redirect into Homepage 
            var cur_url = window.location.href;
            // remove everything after slash /
            cur_url = cur_url.substring(0, cur_url.indexOf('/'));
               // window location now append 
            window.location.replace(cur_url+"/Homepage");
  
  
      }
      
  }

  dataFetch()
  {
       // TODO : GET LIST OF RENDERED PAGE THAT THIS USER CAN SEE

        fetch(CONSTANTS.ENDPOINT.MASTERDETAIL)
        .then(response => {
          if (!response.ok) {   
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then(result => {
          this.setState({ masterDetailText: result });
        })
        .catch(error =>
          this.setState({
            WarningMessageOpen: true,
            WarningMessageText: `${
              CONSTANTS.ERROR_MESSAGE.MASTERDETAIL_GET
            } ${error}`
          })
        );
}

  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  handleDisplayTabClick(id) {
    this.setState({ currentDisplayTabIndex: id });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
<Container>

  <Row>
    <Col md="auto"></Col>
    <Col md="auto">2 of 3 (wider)</Col>
    <Col  md="auto">3 of 3</Col>
  </Row>



</Container>

      </React.Fragment>

    );
  }
}
