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
        username : null,
        password : null,
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


componentWillReceiveProps()
{
  console.log(window.location.href);
  console.log("NAVBAR RELOAD", this.state.username);
  if(this.state.username === null)
  {
    window.location.reload();
  }
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
  console.log("NAV BAR COMPONENT_DID_UPDATE",this.state.username);
  if(this.state.username === null)
  {
      this.getUserInfo();
     console.log(" NAV BAR COMPONENT_DID_UPDATE",this.state.username);
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




  render(){
         

    console.log("IM ABOUT TO GRAB DATA");
    console.log("Current USERNAME : ",this.state.username);
 
        let preAuthButton ;
        let Render_GetStarted;
        let Render_About ;
        let Render_User;
        let titleLink;
         // db return value of is this user authenticated
         // determined here
         // 
         console.log("NAVBAR IM ABOUT TO GRAB DATA");
        if(!this.state.isAuthenticated)
        {
          preAuthButton = <Login/>
          Render_GetStarted = <Link className="nav-item nav-link active" to="Homepage"> Getting Started</Link>
          Render_About =   <Link className="nav-item nav-link active" to="Contact_us"> Contact Us  </Link>
          Render_User = null;




          console.log("User is not logged in yet");
          titleLink = "/Homepage";
        }
        else
        {
       
          preAuthButton = <Logout/>
          Render_GetStarted = null;
          Render_About =  null;
          Render_User =  <Link className="nav-item nav-link active" to=""> Username : {this.state.username} </Link> 
          
          console.log("User logged in , rendered logout");
          titleLink = "/Dashboard";
        
        }
         
      return (
    <React.Fragment>
      <div className={styles.skipLink}>
        <a href="#mainContent">Skip to Main Content</a>
      </div>
      <nav className="navbar navbar-expand-sm navbar-light border-bottom justify-content-between">
        <Link className="navbar-brand" to={titleLink}>
          Policy Street Agent Portal
        </Link>
      
        <div className="navbar-nav">
         {Render_User}
         {Render_GetStarted}
         {Render_About}
         {preAuthButton}
     

        </div>
      </nav>

     
    </React.Fragment>

   )  }
}





 



