import React, { Component } from "react";
import classnames from "classnames";
import styles from "./masterdetail.module.css";
import CONSTANTS from "../../constants";
import {Button , Modal,FormGroup,FormControl,FormLabel} from 'react-bootstrap';
import MasterDetailPage from "./MasterDetailPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome,faUsersCog,faPager,faCogs, faIdCard, faBalanceScale, faTools } from "@fortawesome/free-solid-svg-icons";


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


  componentWillUpdate()
  {
    this.render_controller();
  }

  render_controller()
  {
    if(this.state.on_show_Dashboard)
    {
       return <MainPage/>
    }
    else if(this.state.on_show_AdminPanel)
    {
      return <AdminPanel/>
    }
    else if(this.state.on_show_ProductManagement)
    {
      return <ProductManagement/>
    }
    else if(this.state.on_show_PageManagement)
    {
      return <PageManagement/>
    }
    else if(this.state.on_show_UserManagement)
    {
      return <UserManagement/>
    }
    else if(this.state.on_show_Profile)
    {
      return <Profile/>
    }
    else if(this.state.on_show_Reports)
    {
        return <Reports/>
    }
    else if(this.state.on_show_Settings)
    {
      return <Settings/>
    }
    else
    {
      return <MainPage/>
      // default is MainPage
    }
  }

  render_reset()
  {
    
    
  }



  render() {

    const displayDashboard = () => this.setState({on_show_Dashboard : true});
    const displayProfile = () => this.setState({on_show_Profile : true});
    const displayUserManagement = () => this.setState({on_show_UserManagement : true});
    const displayProductManagement = () => this.setState({on_show_ProductManagement : true});
    const displayPageManagement = () => this.setState({on_show_PageManagement : true});
    const displayReports = () => this.setState({on_show_Reports : true});
    const displaySettings = () => this.setState({on_show_Settings : true});
    const displayAdminPanel = () => this.setState({on_show_AdminPanel : true});


    const {
      masterDetailText,
      currentDisplayTabIndex,
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


          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                      styles.sidebarText )}> Main Menu   </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                styles.sidebarText )} onClick={displayDashboard} ><FontAwesomeIcon icon={faHome} /> Dashboard </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                      styles.sidebarText )} onClick={displayProfile} ><FontAwesomeIcon icon={faIdCard} /> Profile </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                      styles.sidebarText )}onClick={displayUserManagement} ><FontAwesomeIcon icon={faUsersCog} /> User Management </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                                    styles.sidebarText )} onClick={displayProductManagement}> <FontAwesomeIcon icon={faBalanceScale} /> Product Management  </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                      styles.sidebarText )}onClick={displayPageManagement} >  <FontAwesomeIcon icon={faPager} /> Page Management </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                                      styles.sidebarText )} onClick={displayReports} > <FontAwesomeIcon icon={faPager} /> Reports </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
          styles.sidebarText )}  > Administration </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                      styles.sidebarText )} onClick={displaySettings} > <FontAwesomeIcon icon={faCogs} /> Settings </button>

          <button type="button"  className={classnames("list-group-item","list-group-item-action",
                      styles.sidebarText )} onClick={displayAdminPanel} > <FontAwesomeIcon icon={faTools} /> Admin panel </button>
              </div>
             </div>
            <div>
           </div>
          <div>
         </div>

        {/* render page in default*/}

        {this.render_controller()}

        {/* if else render switch*/}
          </div>
        </div>
  
      </main>
    );
  }
}
