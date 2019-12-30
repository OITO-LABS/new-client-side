import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, REIMBURSEMENT_EMPLOYEE_LISTING, APPLY_REIMBURSEMENT } from 'utils/constants';
import dataService from 'utils/dataservice';
import ListTable from "../listTable";
import "assets/sass/pages/_listing.scss";
import DateAndButtonBar from "../dateAndButtonBar";
import Heading from "../heading";
export class ReimbursementListing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      fromDate: "",
      toDate: "",
      sortOrder: "descending",
      sortKey: "reimbursementDate",
      recordsPerPage: 10,
      searchValue: "",
      fields: [
        { label: "sl no", key: "index" },
        { label: " employee id", key: "empNo" },
        { label: "date", key: "reimbursementDate" },
        { label: "Total cost", key: "totalCost" }
      ],


    }
    this.handleDate = this.handleDate.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.gettingData = this.gettingData.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.fetchingData = this.fetchingData.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSort = this.handleSort.bind(this);

  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingData();
  }

  gettingData() {
    const data = {
      page: this.state.activePage - 1,
      dateFrom: this.state.fromDate,
      dateTo: this.state.toDate,
      size: this.state.recordsPerPage,
      empNo: this.state.searchValue,
      sortOrder: this.state.sortOrder,
      sortKey: this.state.sortKey
    };
    let urlKey = "";
    if ((this.state.fromDate == "" && this.state.toDate == "") && this.state.searchValue == "") {
      urlKey = "reimbursementList";
      this.fetchingData(urlKey, data);
    }
    else if ((this.state.fromDate !== "" && this.state.toDate !== "") && this.state.searchValue == "") {
      urlKey = "reimbursementDate";
      this.fetchingData(urlKey, data);
    }
    else if ((this.state.fromDate == "" && this.state.toDate == "") && this.state.searchValue !== "") {
      urlKey = "reimbursementSearch";
      this.fetchingData(urlKey, data);
    }
    else if ((this.state.fromDate !== "" && this.state.toDate !== "") && this.state.searchValue !== "") {
      urlKey = "reimbursementDateAndSearch";
      this.fetchingData(urlKey, data);
    }
  }

  fetchingData(urlKey, data) {
    dataService.postRequest(urlKey, data)
      .then((jsonData) => {
        // jsonData is parsed json object received from url
        console.log(jsonData)
        this.setState({
          totalRecords: jsonData.totalElements,
          datas: jsonData.reimbursementDetails
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleDate(fromDate, toDate) {
    this.setState({
      activePage: 1,
      fromDate: fromDate,
      toDate: toDate
    }, () => { this.gettingData() })
  }

  handlePage(pagenum) {
    this.setState({
      activePage: pagenum
    }, () => { this.gettingData() })
  }

  handleDetails(data) {
    console.log("details");
    console.log(data);
    app.events.trigger(GOTO_URL, { routerKey: REIMBURSEMENT_EMPLOYEE_LISTING, params: { empNo: data.empNo } });
  }

  handleRegister() {
    app.events.trigger(GOTO_URL, { routerKey: APPLY_REIMBURSEMENT });
  }

  handleSearch(value) {
    console.log(value);
    this.setState({
      activePage: 1,
      searchValue: value
    },
      () => { this.gettingData() }
    )
  }

  handleSort(fields) {
    console.log(fields);
    if (this.state.sortOrder === "ascending") {
      this.setState({
        sortOrder: "descending",
        activePage: 1,
        sortKey: fields.key
      }, () => { this.gettingData(); })
    }

    else {
      this.setState({
        sortOrder: "ascending",
        activePage: 1,
        sortKey: fields.key
      }, () => { this.gettingData() })
    }
  }

  render() {
    return (
      <div>
        <DateAndButtonBar button1name="apply for reimbursement" dateHandler={this.handleDate} handleRegister={this.handleRegister} searchHandler={this.handleSearch} />
        <Heading heading="REIMBURSEMENTS" />
        <ListTable
          totalRecords={this.state.totalRecords}
          fields={this.state.fields}
          datas={this.state.datas}
          pageHandler={this.handlePage}
          detailsHandler={this.handleDetails}
          activePage={this.state.activePage}
          sortHandler={this.handleSort}
          sortRequired={true} />
      </div>
    );
  }
}

export default ReimbursementListing;
