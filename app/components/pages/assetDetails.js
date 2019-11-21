import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE, } from 'utils/constants';
import Heading from "../heading"
import DetailsTable from "../detailsTable"
import ListTable from "../listTable"
import dataService from 'utils/dataservice';


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
      employeeFields: [
        { label: "Asset Category", key: "firstName" },
        { label: "Asset Id", key: "lastName" },
        { label: "Asset owner", key: "empNo" },
        { label: "Asset owner Id", key: "designation" },
        { label: "Model ", key: "email" },
        { label: "Sim NO ", key: "contactNo" },
        { label: "Msisdn No ", key: "emergencyContactName" },
        { label: "Mac Id", key: "emergencyContact" },
        { label: "Issue date", key: "healthCardNo" },
        
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
      assetFields: [
        { label: "si no", key: "index" },
        { label: "owner Id", key: "assetKey" },
        { label: "owner name", key: "productCategory" },
        { label: "issue date", key: "model" },
        { label: "return date", key: "model" },
        { label: "cause", key: "model" },
      ]
    }
  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    dataService.getRequest("getEmpDetails", { empId: this.props.match.params.assetId })
      .then(res => {
        this.setState({
          data: res
        });
      })
      .catch(error => {
        console.error(error);
      });

    dataService.getRequest("assetsOfEmployee", { empId: this.props.match.params.empId })
      .then(res => {
        this.setState({
          assets: res
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <div >
        <Heading heading="Asset-Details" />
        <DetailsTable data={this.state.data} fields={this.state.employeeFields} />
        <Heading heading="Asset-History " />
        <ListTable
          totalRecords={1}
          fields={this.state.assetFields}
          datas={this.state.assets} />
      </div>
    );
  }
}

export default AssetDetails;
