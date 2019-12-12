import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE, ASSET_DETAILS } from 'utils/constants';
import Heading from "../heading"
import DetailsTable from "../detailsTable"
import ListTable from "../listTable"
import dataService from 'utils/dataservice';
import "assets/sass/pages/_details.scss";
import "assets/sass/pages/_listing.scss";


export class EmployeeDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employeeFields: [
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Employee ID", key: "empNo" },
                { label: "Designation", key: "designation" },
                { label: "Email ", key: "email" },
                { label: "Contact NO ", key: "contactNo" },
                { label: "Emergency Contact Person ", key: "emergencyContactName" },
                { label: "Emergency Contact No ", key: "emergencyContact" },
                { label: "Health Card Number ", key: "healthCardNo" },
                { label: "Blood Group ", key: "bloodGroup" },
                { label: "Date Of Birth", key: "dob" },
            ],
            assetFields: [
                { label: "si no", key: "index" },
                { label: "asset-key", key: "assetKey" },
                { label: "asset-category", key: "productCategory" },
                { label: "model", key: "model" },
            ]
        }
        this.gettingEmployee = this.gettingEmployee.bind(this);
        this.gettingAssets = this.gettingAssets.bind(this);
        this.handleDetails = this.handleDetails.bind(this);
    }
    componentDidMount() {
        app.events.trigger(FLIP_LOADER, { status: false, reset: true });
        this.gettingEmployee();
        this.gettingAssets();
    }

    gettingEmployee() {
        dataService.getRequest("getEmpDetails", { empId: this.props.match.params.empId })
            .then(res => {
                this.setState({
                    data: res.employeeDetails
                });
            })
            .catch(error => {
                console.error(error);
            });
    }

    gettingAssets() {
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

    handleDetails(data) {
        console.log("details");
        console.log(data.assetId);
        app.events.trigger(GOTO_URL, { routerKey: ASSET_DETAILS, params: { assetId: data.assetId } });
    }

    render() {
        return (
            <div >
                <Heading heading="EMPLOYEE DETAILS" />
                <DetailsTable data={this.state.data} fields={this.state.employeeFields} />
                <Heading heading="ASSETS IN HAND" />
                <ListTable
                totalRecords={1}
                fields={this.state.assetFields}
                datas={this.state.assets}
                detailsHandler={this.handleDetails} />
                
            </div>
        );
    }
}

export default EmployeeDetails;
