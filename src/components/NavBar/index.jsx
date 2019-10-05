import React ,{Component} from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "../Login/index";
import Logout from "../Logout/index";
import db from "../Database/db";




//TODO Web Template Studio: Add a new link in the NavBar for your page here.
// A skip link is included as an accessibility best practice. For more information visit https://www.w3.org/WAI/WCAG21/Techniques/general/G1.
export default class NavBar extends Component  {

  constructor(props)
  {
     

    super(props);
       this.state = {
        show : false,
        username : "Guest",
        password : undefined,
        WarningMessageOpen: false,
        WarningMessageText: "",
        isAuthenticated : false


    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
  }



  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  componentWillMount()
  {
     this.getUserInfo();

    
  }



 async getUserInfo()
 {
     var user_info = await db.user_info.orderBy("id").reverse().limit(1).toArray();
     this.setState({
      username : user_info[0]['userName'],
      password : user_info[0]['passWord'],
      isAuthenticated : user_info[0]['isAuthenticated'],
      token : user_info[0]['token']
    })

      return user_info;
 }


  render(){

  

    console.log("IM ABOUT TO GRAB DATA");
    console.log("Current USERNAME : ",this.state.username);
 
        let preAuthButton ;
         // db return value of is this user authenticated
         // determined here
         // 

        if(!this.state.isAuthenticated)
        {
          preAuthButton = <Login/>
          console.log("User is not logged in yet");
        }
        else
        {
       
          preAuthButton = <Logout/>
          console.log("User logged in , rendered logout");
        }
         
      return (
    <React.Fragment>
      <div className={styles.skipLink}>
        <a href="#mainContent">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <Link className="navbar-brand" to="/">
          Policy Street Agent Portal 
        </Link>
        <div className="navbar-nav">

          <Link className="nav-item nav-link active" to="Grid">
            Getting Started
          </Link>

          <Link className="nav-item nav-link active" to="List">
            About
          </Link>
         

         {preAuthButton}
        
        </div>
      </nav>
    </React.Fragment>
   )  }
}





 



