import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE, EMPLOYEE_DETAILS } from 'utils/constants';
import Heading from "../heading"
import DetailsTable from "../detailsTable"
import ListTable from "../listTable"
import dataService from 'utils/dataservice';
import "assets/sass/pages/_listing.scss";
import "assets/sass/pages/_details.scss";
import { getCookie, setCookie, removeCookie } from "utils/cookie";




export class AssetDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // data:{
      //     "empId": 2,
      //     "firstName": "Shahana",
      //     "lastName": "Shalikh",
      //     "email": "sanashalikh@gmail.com",
      //     "designation": "intern",
      //     "dob": "1996-10-31T18:30:00.000+0000",
      //     "contactNo": 91524354343,
      //     "emergencyContactName": "ShalikhJaleel",
      //     "emergencyContact": 9786423448,
      //     "healthCardNo": "OITO101INT002",
      //     "bloodGroup": "O+",
      //     "status": "Y",
      //     "empNo": "INT002"
      // },
      assetFields: [
        { label: "Asset Category", key: "productCategoryName" },
        { label: "Asset key", key: "assetKey" },
        { label: "Asset owner", key: "fname" },
        { label: "Asset owner Id", key: "empNo" },
        { label: "Model ", key: "model" },
        { label: "Sim NO ", key: "simNo" },
        { label: "Msisdn No ", key: "msisdnNO" },
        { label: "Mac Id", key: "macId" },
        { label: "Issue date", key: "issueDate" },

      ],
      // assets:[
      //     {
      //         "assetId": 1,
      //         "assetKey": "RouterMS4Black",
      //         "model": "Jio",
      //         "macId": "BC8AE8432445F",
      //         "simNo": "8086595711",
      //         "msisdnNo": null,
      //         "enableStatus": "Assigned",
      //         "productCategory": "WiFi",
      //         "empId": 1,
      //         "id": null
      //     },
      //     {
      //         "assetId": 3,
      //         "assetKey": "DELL111",
      //         "model": "Dell",
      //         "macId": null,
      //         "simNo": null,
      //         "msisdnNo": null,
      //         "enableStatus": "Assigned",
      //         "productCategory": "Laptop",
      //         "empId": 1,
      //         "id": null
      //     }
      // ],
      historyFields: [
        { label: "si no", key: "index" },
        { label: "owner Id", key: "empNo" },
        { label: "owner name", key: "fname" },
        { label: "issue date", key: "issueDate" },
        { label: "return date", key: "returnDate" },
        { label: "cause", key: "cause" },
      ]
    }
    this.handlePage = this.handlePage.bind(this);
    this.gettingHistory = this.gettingHistory.bind(this);
    this.gettingAsset = this.gettingAsset.bind(this);
    this.handleDetails = this.handleDetails.bind(this);
  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingAsset();
    this.gettingHistory();
  }

  gettingHistory() {
    dataService.getRequest("assetHistory", { assetId: this.props.match.params.assetId })
      .then(res => {
        this.setState({
          historyDatas: res
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  gettingAsset() {
    dataService.getRequest("getAsset", { assetId: this.props.match.params.assetId })
      .then(res => {
        debugger;
        this.setState({
          assetData: res[0]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handlePage(data) {
    console.log(data);
  }

  handleDetails(data) {
    console.log("details");
    console.log(data.empId);
    app.events.trigger(GOTO_URL, { routerKey: EMPLOYEE_DETAILS, params: { empId: data.empId } });
  }

  render() {
    return (
      <div >
        <Heading heading="ASSET DETAILS" />
        <DetailsTable data={this.state.assetData} fields={this.state.assetFields} />
        {getCookie("role") == "admin" ?
          <React.Fragment>
            <Heading heading="ASSET HISTORY " />
            <ListTable
              totalRecords={1}
              fields={this.state.historyFields}
              pageHandler={this.handlePage}
              datas={this.state.historyDatas}
              detailsHandler={this.handleDetails} />
          </React.Fragment>
          : ""}
      </div>
    );
  }
}

export default AssetDetails;
