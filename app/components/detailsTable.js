import React, { Component } from 'react';

export class DetailsTable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fields: [
                { label: "First Name", key: "firstName" },
                { label: "Last Name", key: "lastName" },
                { label: "Employee ID", key: "empId" },
                { label: "Designation", key: "designation" },
                { label: "Email ", key: "email" },
                { label: "Contact NO ", key: "contactNo" },
                { label: "Emergency Contact Person ", key: "emergencyContactPerson" },
                { label: "Emergency Contact No ", key: "emergencyContactNumber" },
                { label: "Health Card Number ", key: "healthCardNumber" },
                { label: "Blood Group ", key: "bloodGroup" },
            ],
            data: {
                firstName: "abhishek",
                lastName: "t v",
                empId: "int001",
                designation: "developer",
                email: "abhi@gmail.com",
                contactNo: "9898989898",
                emergencyContactPerson: "abhinand",
                emergencyContactNumber: "3434343434",
                healthCardNumber: "health001",
                bloodGroup: "0",
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
                            <tr>
                                <td>{field.label}</td>
                                <td>{this.state.data[field.key]}</td>
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
                                <tr>
                                    <td>{field.label}</td>
                                    <td>{this.state.data[field.key]}</td>
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
                <div className="col-6">
                    <table className="table table-bordered">
                        <thead></thead>
                        {this.renderTableData1()}
                    </table>
                </div>
                <div className="col-6">
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
