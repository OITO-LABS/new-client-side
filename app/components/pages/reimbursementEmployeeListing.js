import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, REIMBURSEMENT_BILL_LISTING, APPLY_REIMBURSEMENT } from 'utils/constants';
import dataService from 'utils/dataservice';
import ListTable from "../listTable";
import "assets/sass/pages/_listing.scss";
import { getCookie, setCookie, removeCookie } from "utils/cookie";

export class ReimbursementEmployeeListing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      recordsPerPage: 10,
      fields: [
        { label: "si no", key: "index" },
        { label: "reimbursement Id", key: "reimbursementId" },
        { label: "date", key: "reimbursementDate" },
        { label: "Total cost", key: "totalCost" },
        { label: "status", key: "reimbursementStatus" }
      ],
      // datas: [
      //   {
      //     "reimbursementId": 13,
      //     "reimbursementDate": "2019-11-21",
      //     "empNo": "EMP001",
      //     "totalCost": 6000
      //   },
      //   {
      //     "reimbursementId": 5,
      //     "reimbursementDate": "2019-11-20",
      //     "empNo": "EMP001",
      //     "totalCost": 6000
      //   },
      //   {
      //     "reimbursementId": 10,
      //     "reimbursementDate": "2019-11-19",
      //     "empNo": "EMP002",
      //     "totalCost": 14000
      //   },
      //   {
      //     "reimbursementId": 4,
      //     "reimbursementDate": "2019-11-18",
      //     "empNo": "EMP001",
      //     "totalCost": 6000
      //   },
      //   {
      //     "reimbursementId": 11,
      //     "reimbursementDate": "2019-11-17",
      //     "empNo": "EMP002",
      //     "totalCost": 19000
      //   }
      // ]

    }
    this.handlePage = this.handlePage.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
    this.gettingData = this.gettingData.bind(this);
    this.handleVerify=this.handleVerify.bind(this);
  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingData();
  }

  gettingData() {
    let role = getCookie('role');
    const data = { page: this.state.activePage - 1, empNo: this.props.match.params.empNo, size: this.state.recordsPerPage, role: role }
    let urlKey = "reimbursementEmployee";
    dataService.postRequest(urlKey, data)
      .then((jsonData) => {
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


  handlePage(pagenum) {
    this.setState({
      activePage: pagenum
    }, () => { this.gettingData() })
  }

  handleDetails(data) {
    console.log("details");
    console.log(data);
    if (data.reimbursementStatus == "Save") {
      app.events.trigger(GOTO_URL, { routerKey: APPLY_REIMBURSEMENT, params: { reimbursementId: data.reimbursementId, reimbursementStatus: data.reimbursementStatus } });
    }
    else {
      app.events.trigger(GOTO_URL, { routerKey: REIMBURSEMENT_BILL_LISTING, params: { reimbursementId: data.reimbursementId } });
    }
  }

  handleVerify(data) {
    let urlKey = "reimbursementVerify";
    dataService.postRequest(urlKey,{reimbursementId:data.reimbursementId})
      .then(res => {
        if(res.status == 'success') {
          app.events.trigger(SHOW_ALERT_MSG, { visible: true,type: ALERT_TYPE.SUCESS,msg: "Successfully Verified"});
        }
        else {
          app.events.trigger(SHOW_ALERT_MSG, {visible: true,type: ALERT_TYPE.DANGER,msg: `Verification ${res.message} !!!`});
        }
      })
      .catch(err => {
        app.events.trigger(SHOW_ALERT_MSG, {visible: true,type: ALERT_TYPE.DANGER,msg: "Failed To Verify"});
      })
  }

  render() {
    return (
      <div>
        <ListTable
          totalRecords={this.state.totalRecords}
          fields={this.state.fields}
          datas={this.state.datas}
          pageHandler={this.handlePage}
          detailsHandler={this.handleDetails}
          verifyHandler={this.handleVerify} />
      </div>
    );
  }
}

export default ReimbursementEmployeeListing;
