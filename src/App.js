import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Blank from "./components/Blank";
import Homepage from "./components/Homepage";
import Contact_us from "./components/Contact_us";
import Dashboard from "./components/Dashboard";
import NotFound from "./components/Error";



//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar  {...this.props}/>
        <Switch>
          <Redirect exact path = "/" to = "/Homepage" />
          <Route path = "/Homepage" component = { Homepage } />
          <Route path = "/Blank" component = { Blank } />
          <Route path = "/Contact_us" component = { Contact_us } />
           <Route path = "/Dashboard"  render={(props) => <Dashboard {...props} /> }  />

           <Route component={NotFound} />

        </Switch>
        <Footer />
      </React.Fragment>



    );
  }
}

export default App;
