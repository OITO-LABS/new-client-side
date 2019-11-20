import React, { Component } from "react";
import { GOTO_URL, FLIP_LOADER, EMPLOYEE_LISTING,SHOW_ALERT_MSG,ALERT_TYPE } from "utils/constants";
import FormField from "../common/formfield";
import dataService from "utils/dataservice";

export class registerEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.getStateData(this.props)
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.update = this.update.bind(this);
    this.cancel = this.cancel.bind(this);
    this.fieldData = {};
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    dataService.getRequest("getEmpDetails", { empNo: this.props.match.params.empId })
      // .then(res => res.json())
      .then(result => {
        this.setState({
          ...this.getStateData(result)
        });
      })
      .catch(error => {
        console.error(error);
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

  handleInputChange(event, fieldData = {}) {
    let field = fieldData.field || event.target.name;
    let value = fieldData.value || event.target.value || "";
    this.fieldData[field] = fieldData;
    event &&
      this.setState({
        [field]: event.target.type == "checkbox" ? event.target.checked : value
      });
  }

  submit() {
    dataService.postRequest("registered", { ...this.getStateData(this.state) })
      .then(res => {
        app.events.trigger(SHOW_ALERT_MSG, {
          visible: true,
          type: ALERT_TYPE.SUCESS,
          msg: res
        });
      })
      .catch(err => {console.log(err)});
  }

  update() {
    dataService.putRequest("updateEmployee", { empNo: this.props.match.params.empId } ,{ ...this.getStateData(this.state) } )
    .then(res => {
      app.events.trigger(SHOW_ALERT_MSG, {
        visible: true,
        type: ALERT_TYPE.SUCESS,
        msg: res
      });
    })
    .catch(err => {console.log(err)});
  }

  cancel() {
    // console.log(data);
    app.events.trigger(GOTO_URL, { routerKey: EMPLOYEE_LISTING });
  }

  render() {
    var empNo = this.props.match.params.empId;
    return (
      <div className="form-wrapper">
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
            />
            <FormField
              label="Employee Number"
              labelClassName="txt-label"
              fieldClassName="txt-input"
              mandatory
              disabled = {empNo !='-1'}
              onChange={this.handleInputChange}
              name="empNo"
              value={this.state.empNo}
              placeholder="Employee Number"
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
                { value: "A+ve", label: "A+ve" },
                { value: "B+ve", label: "B+ve" },
                { value: "B-ve", label: "B-ve" },
                { value: "AB+ve", label: "AB+ve" },
                { value: "AB-ve", label: "AB-ve" },
                { value: "O+ve", label: "O+ve" },
                { value: "O-ve", label: "O-ve" }
              ]}
              value={this.state.bloodGroup}
              placeholder="Blood Group"
            />
          </div>
        </div>

        <div className="btn-wrapper">
        {empNo == "-1" ? 
          <button type="button" className="btn submit-btn" onClick={this.submit}>Submit</button>: 
          <button type="button" className="btn submit-btn" onClick={this.update}>Update</button>
        }

          <button
            type="button"
            className="btn cancel-btn"
            onClick={this.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default registerEmployee;
