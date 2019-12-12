import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE, ASSET_DETAILS, ADD_ASSETS, ASSIGN_ASSETS } from 'utils/constants';
import dataService from 'utils/dataservice';
import SearchAndButtonBar from "../searchAndButtonBar";
import ListTable from "../listTable";
import "assets/sass/pages/_listing.scss";
import { confirm } from 'utils/common';
import Heading from "../heading";

export class InactiveAssetListing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      sortOrder: "ascending",
      sortKey: "assetId",
      searchValue: "",
      recordsPerPage: 10,
      fields: [
        { label: "sl no", key: "index" },
        { label: "Key", key: "assetKey" },
        { label: "category", key: "productCategoryName" },
        { label: "model", key: "model" },
        // { label: "owner id", key: "empNo" },
        // { label: "action", key: "editDelete" },
        { label: "Activate", key: "status" }
      ],

    }
    this.gettingData = this.gettingData.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleActivate = this.handleActivate.bind(this);
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingData();
  }

  gettingData() {

    let urlKey = "";
    const data = {
      page: this.state.activePage - 1,
      searchkey: this.state.searchValue,
      limit: this.state.recordsPerPage,
      sortOrder: this.state.sortOrder,
      sortKey: this.state.sortKey,
      enableStatus: "Inactive"
    }

    if (this.state.searchValue === "") {
      urlKey = "assetList";
    }
    else {
      urlKey = "assetSearch";
    }
    dataService.postRequest(urlKey, data)
      .then((jsonData) => {
        console.log(jsonData);
        this.setState({
          totalRecords: jsonData.totalElements,
          datas: jsonData.resultSet
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handlePage(pagenum) {
    this.setState({
      activePage: pagenum
    }, () => { this.gettingData() })
  }

  handleSearch(value) {
    this.setState({
      activePage: 1,
      searchValue: value
    }, () => { this.gettingData() })
  }




  handleDetails(data) {
    console.log("details");
    console.log(data.assetId);
    app.events.trigger(GOTO_URL, { routerKey: ASSET_DETAILS, params: { assetId: data.assetId } });
  }

  handleRegister() {
    app.events.trigger(GOTO_URL, { routerKey: ADD_ASSETS, params: { assetId: -1 } });
  }


  handleSort(fields) {
    console.log(fields);
    if (this.state.sortOrder === "") {
      this.setState({
        sortOrder: "ascending",
        activePage: 1,
        sortKey: fields.key
      }, () => { this.gettingData(); })
    }
    else if (this.state.sortOrder === "ascending") {
      this.setState({
        sortOrder: "descending",
        activePage: 1,
        sortKey: fields.key
      }, () => { this.gettingData(); })
    }
    else if (this.state.sortOrder === "descending") {
      this.setState({
        sortOrder: "ascending",
        activePage: 1,
        sortKey: fields.key
      }, () => { this.gettingData() })
    }
  }


  handleActivate(data) {
    dataService.putRequest("assetActivate", { assetId: data.assetId })
      .then(res => {
        if (res.status == "success") {
          app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.SUCCESS, msg: "Asset Activation  Successfull" });
          this.gettingData();
        }
        else {
          app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.DANGER, msg: `${res.message}` });
        }
      })
      .catch(err => {
        app.events.trigger(SHOW_ALERT_MSG, { visible: true, type: ALERT_TYPE.DANGER, msg: "Failed To Unassign" });
      });

  }

  render() {
    return (
      <div>
        <SearchAndButtonBar
          button1name="Add Asset"
          button2name="export"
          handleRegister={this.handleRegister}
          searchHandler={this.handleSearch} />
        <Heading heading="INACTIVE ASSETS" />
        <ListTable
          totalRecords={this.state.totalRecords}
          fields={this.state.fields}
          datas={this.state.datas}
          pageHandler={this.handlePage}
          detailsHandler={this.handleDetails}
          activePage={this.state.activePage}
          sortHandler={this.handleSort}
          sortRequired={true}
          activateHandler={this.handleActivate} />
      </div>
    );
  }
}

export default InactiveAssetListing;

