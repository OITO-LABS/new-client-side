import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, REIMBURSEMENT_EMPLOYEE_LISTING,APPLY_REIMBURSEMENT } from 'utils/constants';
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
      recordsPerPage: 10,
      fields: [
        { label: "si no", key: "index" },
        { label: "employee no", key: "empNo" },
        { label: "date", key: "reimbursementDate" },
        { label: "Total cost", key: "totalCost" },
      ],
      //   datas:[
      //     {
      //         "reimbursementId": 13,
      //         "reimbursementDate": "2019-11-21",
      //         "empNo": "EMP001",
      //         "totalCost": 6000
      //     },
      //     {
      //         "reimbursementId": 5,
      //         "reimbursementDate": "2019-11-20",
      //         "empNo": "EMP001",
      //         "totalCost": 6000
      //     },
      //     {
      //         "reimbursementId": 10,
      //         "reimbursementDate": "2019-11-19",
      //         "empNo": "EMP002",
      //         "totalCost": 14000
      //     },
      //     {
      //         "reimbursementId": 4,
      //         "reimbursementDate": "2019-11-18",
      //         "empNo": "EMP001",
      //         "totalCost": 6000
      //     },
      //     {
      //         "reimbursementId": 11,
      //         "reimbursementDate": "2019-11-17",
      //         "empNo": "EMP002",
      //         "totalCost": 19000
      //     }
      // ]

    }
    this.handleDate = this.handleDate.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.gettingData = this.gettingData.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.fetchingData=this.fetchingData.bind(this);

  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingData();
  }

  gettingData() {
    const data = { page: this.state.activePage - 1, dateFrom: this.state.fromDate, dateTo: this.state.toDate, size: this.state.recordsPerPage };
    let urlKey = "";
    if (this.state.fromDate == "" && this.state.toDate == "") {
      urlKey = "reimbursementList";
      this.fetchingData(urlKey,data);
    }
    else if (this.state.fromDate !== "" && this.state.toDate !== "") {
      urlKey = "reimbursementDate";
      this.fetchingData(urlKey,data);
    }
  }

  fetchingData(urlKey,data) {
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
        console.error(error)
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

  render() {
    return (
      <div>
        <DateAndButtonBar button1name="apply for reimbursement" dateHandler={this.handleDate} handleRegister={this.handleRegister} />
        <Heading heading="REIMBURSEMENTS" />
        <ListTable
          totalRecords={this.state.totalRecords}
          fields={this.state.fields}
          datas={this.state.datas}
          pageHandler={this.handlePage}
          detailsHandler={this.handleDetails} />
      </div>
    );
  }
}

export default ReimbursementListing;
