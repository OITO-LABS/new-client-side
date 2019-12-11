import React, { Component } from "react";
import { FLIP_LOADER } from "utils/constants";
import Admin_Logo from 'assets/images/Admin.png';
import "assets/sass/pages/_employeeRegister.scss";
import FormField from "../common/formfield";
import dataService from 'utils/dataservice';

class Profile extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fieldData = {};
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
     dataService.getRequest("getEmpDetails", { empId: app.empId })
      .then(result => {
        app.userDetails=result;
        this.setState({
          ...this.getStateData(result),
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleInputChange(event, fieldData = {}) {
    let field = fieldData.field || event.target.name;
    let value = fieldData.value || event.target.value || "";
    this.fieldData[field] = fieldData;
    event && this.setState({
        [field]: event.target.type == "checkbox" ? event.target.checked : value
    });
  }

  getStateData(empdata) {
    return {
      firstName: empdata.firstName || "",
      lastName: empdata.lastName || "",
      email: empdata.email || "",
      designation: empdata.designation || "",
      dob: empdata.dob || "",
      contactNo: empdata.contactNo || "",
      emergencyContactName: empdata.emergencyContactName || "",
      emergencyContact: empdata.emergencyContact || "",
      healthCardNo: empdata.healthCardNo || "",
      empNo: empdata.empNo || "",
      bloodGroup: empdata.bloodGroup || ""
    };
  }



  render() {
    return (
      <div className="row" id="content">
        <div className="box-content">
          {/* Image Wrapper */}
          <div className="image-wrapper">
            <img className="image-subwrapper" src={Admin_Logo} />
          </div>

          {/* Heading */}
          <p className="greeting">YOUR PROFILE</p>

          <div className="d-flex justify-content-sm-around">
          
            {/* Input details first block  */}
            <div className="p-2 w-25 mt-5">
              <FormField
                label="First Name"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                name="firstName"
                onChange={this.handleInputChange}
                value={this.state.firstName}
                placeholder="First Name"
                // validator={validation}
              />
              <FormField
                label="Last Name"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="lastName"
                value={this.state.lastName}
                placeholder="Last Name"
                // validator={validation}
              />
              <FormField
                label="Email"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="email"
                value={this.state.email}
                placeholder="Email"
                // validator={validation}
              />
              <FormField
                label="Designation"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="designation"
                value={this.state.designation}
                placeholder="Designation"
                // validator={validation}
              />
              <FormField
                label="DOB"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="dob"
                type="date"
                value={this.state.dob}
                placeholder="DOB"
                // validator={validation}
              />
              <FormField
                label="Upload Profile Pic"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                type="file"
                mandatory
                onChange={this.handleInputChange}
                name="image"
                value={this.state.image}
                // validator={validation}
              />
            </div>

            {/* Input details second block  */}
            <div className="p-2 w-25 mt-5">
              <FormField
                label="Contact Number"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="contactNo"
                value={this.state.contactNo}
                placeholder="Contact Number"
                type="phone"
                minLength="8"
                maxLength="10"
                // validator={validation}
              />
              <FormField
                label="Emergency Contact Name"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="emergencyContactName"
                value={this.state.emergencyContactName}
                placeholder="Emergency Contact Name"
                // validator={validation}
              />
              <FormField
                label="Emergency Contact Number"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="emergencyContact"
                value={this.state.emergencyContact}
                placeholder="Emergency Contact Number"
                type="phone"
                minLength="8"
                maxLength="10"
                // validator={validation}
              />
              <FormField
                label="Healthcard Number"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                onChange={this.handleInputChange}
                name="healthCardNo"
                value={this.state.healthCardNo}
                placeholder="Healthcard Number"
                // validator={validation}
              />
              <FormField
                label="Employee Number"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                disabled
                onChange={this.handleInputChange}
                name="empNo"
                value={this.state.empNo}
                placeholder="Employee Number"
                // validator={validation}
              />
              <FormField
                type="select"
                label="Blood Group"
                labelClassName="txt-label"
                fieldClassName="select-input"
                mandatory
                name="bloodGroup"
                nameAlias={"abc_fullName"}
                onChange={this.handleInputChange}
                options={[
                  { value: "A+", label: "A+" },
                  { value: "A-", label: "A-" },
                  { value: "B", label: "B+" },
                  { value: "B-", label: "B-" },
                  { value: "AB+", label: "AB+" },
                  { value: "AB-", label: "AB-" },
                  { value: "O+", label: "O+" },
                  { value: "O-", label: "O-" }
                ]}
                value={this.state.bloodGroup}
                placeholder="Blood Group"
                // validator={validation}
              />

            </div>



            <div>
              <button onClick={this.onEditClick}>Edit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
