import React, { Component } from 'react';
import SearchAndButtonBar from "../searchAndButtonBar";
import ListTable from "../listTable";
import {FLIP_LOADER,GOTO_URL,SHOW_ALERT,SHOW_ALERT_MSG,ALERT_TYPE,ASSET_LISTING,ADD_ASSETS} from "utils/constants";
export class AssetListing extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
    }
    
    handleRegister() {
      app.events.trigger(GOTO_URL, { routerKey: ADD_ASSETS,params:{empId:-1} });
    }
  render() {
    return (
      <div>
        <SearchAndButtonBar
          button1name="Register Asset"
          button2name="export"
          handleRegister={this.handleRegister}
          searchHandler={this.handleSearch} />
      </div>
    );
  }
}

export default AssetListing;
