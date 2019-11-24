import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE, } from 'utils/constants';
import Heading from "../heading"
import DetailsTable from "../detailsTable"
import ListTable from "../listTable"
import dataService from 'utils/dataservice';
import "assets/sass/pages/_listing.scss";


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
  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingAsset();
    this.gettingHistory();
    // dataService.getRequest("getAsset", { assetId: this.props.match.params.assetId })
    //   .then(res => {
    //     debugger;
    //     this.setState({
    //       assetData: res[0]
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // dataService.getRequest("assetHistory", { assetId: this.props.match.params.assetId })
    //   .then(res => {
    //     this.setState({
    //       historyDatas: res
    //     });
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
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

  render() {
    return (
      <div >
        <Heading heading="ASSET DETAILS" />
        <DetailsTable data={this.state.assetData} fields={this.state.assetFields} />
        <Heading heading="ASSET HISTORY " />
        <ListTable
          totalRecords={1}
          fields={this.state.historyFields}
          pageHandler={this.handlePage}
          datas={this.state.historyDatas} />
      </div>
    );
  }
}

export default AssetDetails;
