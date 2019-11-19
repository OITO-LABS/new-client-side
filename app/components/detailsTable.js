import React, { Component } from 'react';
import "assets/css/detailsTable.css";
export class DetailsTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fields: [
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
                {label:"dob",key:"dob"},
            ],
            data: {
                firstName: "abhishek",
                lastName: "t v",
                empNo: "int001",
                designation: "developer",
                email: "abhi@gmail.com",
                contactNo: "9898989898",
                emergencyContactName: "abhinand",
                emergencyContact: "3434343434",
                healthCardNo: "health001",
                bloodGroup: "0",
                dob:"1995-11-07"
            }


        }
        this.renderTableData1 = this.renderTableData1.bind(this);
        this.renderTableData2 = this.renderTableData2.bind(this);

    }

    renderTableData1() {
        return (
            <tbody>
                {this.state.fields.map((field, index) => {
                    if (index % 2 === 0) {
                        return (
                            <tr key={index}>
                                <td className="field">{field.label}</td>
                                <td className="value">{this.state.data[field.key]}</td>
                            </tr>
                        )

                    }
                })}
            </tbody>
        )
    }
    renderTableData2() {
        return (
            <tbody>
                    {this.state.fields.map((field, index) => {
                        if (index % 2 === 1) {
                            return (
                                <tr key={index}>
                                    <td className="field">{field.label}</td>
                                    <td className="value">{this.state.data[field.key]}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
        )
    }

    render() {
        return (
            <div className="row">
                <div className="col-6 detailsTable">
                    <table className="table table-bordered">
                        <thead></thead>
                        {this.renderTableData1()}
                    </table>
                </div>
                <div className="col-6 detailsTable">
                    <table className="table table-bordered">
                    <thead></thead>
                    {this.renderTableData2()}
                    </table>
                </div>
            </div>
        );
    }
}

export default DetailsTable;
