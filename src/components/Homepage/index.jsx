import React, { Component } from "react";
import classnames from "classnames";
import GridComponent from "./GridComponent";

import WarningMessage from "../WarningMessage";
import GreyBox from "../../images/GreyBox.svg";
import styles from "./grid.module.css";
import CONSTANTS from "../../constants";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridTextAssets: [{ description: "", header: "", id: 0 }],
      WarningMessageOpen: false,
      WarningMessageText: ""
    };

    this.handleWarningClose = this.handleWarningClose.bind(this);
  }
    componentDidMount(){
        fetch(CONSTANTS.ENDPOINT.URL + CONSTANTS.SYSTEM.CALL,{
        method: 'POST',
        headers :{'Content-Type': 'application/json'},
        body : JSON.stringify({ system_request : 'company_list'})
      })
        .then(response => {
         if (!response.ok) {
   
           throw Error(response.statusText);
          }
       return response.json();
        })
      .then(results => this.setState({gridTextAssets:results}))
      .catch(error =>
         this.setState({
           WarningMessageOpen : true,
           WarningMessageText: `Request to get grid text failed: ${error}`
          })
        )
    }



  handleWarningClose() {
    this.setState({
      WarningMessageOpen: false,
      WarningMessageText: ""
    });
  }

  render() {
    const {
      gridTextAssets,
      WarningMessageOpen,
      WarningMessageText
    } = this.state;
    return (

      <main id="mainContent">
        <div className={classnames("text-center", styles.header)}>

        <h1 className={styles.white}>Policy Street Agent Portal </h1>
        <p className={styles.white}>Where Consumer and Agents meet satisfaction</p>
          <a href="https://policystreet.com/" className="btn btn-primary my-2">
            Link to our Official Website
          </a>
        </div>

      {/* just want to test how the video play <Video/> */}

        <div className="container">
          <div className="row justify-content-center py-5">
            <h1>Our Partners</h1>
          </div>

          <div className="row justify-content-around text-center pb-5">
            {gridTextAssets.map(textAssets => (
              <GridComponent
                key={textAssets.id}
                header={textAssets.title}
                image={GreyBox}
              />
            ))}
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
