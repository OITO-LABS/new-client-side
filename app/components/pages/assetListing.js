import React, { Component } from 'react';
import SearchAndButtonBar from "../searchAndButtonBar";
import ListTable from "../listTable";
export class AssetListing extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         
      }
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
