import React, { Component } from "react";
import classnames from "classnames";
import WarningMessage from "../WarningMessage";
import MasterDetailPage from "./MasterDetailPage";
import MasterDetailSideBarTab from "./MasterDetailSideBarTab";
import GreyAvatar from "../../images/GreyAvatar.svg";
import styles from "./masterdetail.module.css";
import CONSTANTS from "../../constants";
import {Button , Modal,FormGroup,FormControl,FormLabel} from 'react-bootstrap';


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
      ]
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





  render() {

    
    const {
      masterDetailText,
      currentDisplayTabIndex,
      WarningMessageOpen,
      WarningMessageText
    } = this.state
    return (
      <main id="mainContent">
        <div className="container-fluid">
          <div className="row">
            <div
              className={classnames(
                "col-2",
                "p-0",
                "border-right",
                styles.sidebar
              )}
            >
              <div className="list-group list-group-flush border-bottom">
                {masterDetailText.map((textAssets, index) => (
                  <MasterDetailSideBarTab
                    onDisplayTabClick={this.handleDisplayTabClick}
                    tabText={textAssets.title}
                    image={GreyAvatar}
                    index={index}
                    key={textAssets.id}
                    
                  />
                ))}
                <Button className="list-group-itemlist group-item-action"
                        variant="success">  Login  </Button>
              </div>
      
            </div>
            <MasterDetailPage
              textSampleData={masterDetailText[currentDisplayTabIndex]}
            />
          </div>
        </div>
        <WarningMessage
          open={WarningMessageOpen}
          text={WarningMessageText}
          onWarningClose={this.handleWarningClose}
        />
      </main>
    );
  }
}
