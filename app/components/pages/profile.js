import React, { Component } from "react";
import { GOTO_URL,FLIP_LOADER,SHOW_ALERT_MSG,ALERT_TYPE,PROFILE } from "utils/constants";
import Admin_Logo from 'assets/images/Admin.png';
import "assets/sass/pages/_employeeRegister.scss";
import FormField from "../common/formfield";
import FormValidator from '../common/formvalidator';
import dataService from 'utils/dataservice';
import { getCookie, setCookie, removeCookie } from "utils/cookie";


class Profile extends Component {

  constructor(props) {
    super(props);
    this.validateFieldData = this.validateFieldData.bind(this);
    this.validEmailData = this.validEmailData.bind(this);
    this.validator = new FormValidator([
      {
        field: 'firstName', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'First name is empty'
      },
      {
        field: 'lastName', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Last name is empty'
      },
      {
        field: 'designation', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Designation is empty'
      },
      {
        field: 'email', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Email is empty'
      },
      {
        field: 'email', 
        method: this.validEmailData, 
        args:[{ignore_whitespace:true}],
        validWhen: true, 
        message: 'Invalid format'
      },
      // {
      //   field: 'image', 
      //   method: 'isEmpty', 
      //   args:[{ignore_whitespace:true}],
      //   validWhen: false, 
      //   message: 'Profile image is empty'
      // },
      {
        field: 'dob', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Date of birth is empty'
      },
      { 
        field: 'contactNo', 
        method: this.validateFieldData, 
        args:[{propName:'phone'}],
        validWhen: true, 
        message: 'Contact number is empty'
      },
      { 
        field: 'contactNo', 
        method: this.validateFieldData, 
        args:[{propName:'valid'}],
        validWhen: true, 
        message: 'Invalid contact number'
      },
      {
        field: 'emergencyContactName', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Emergency contact name is empty'
      },
      { 
        field: 'emergencyContact', 
        method: this.validateFieldData, 
        args:[{propName:'phone'}],
        validWhen: true, 
        message: 'Emergency contact number is empty'
      },
      { 
        field: 'emergencyContact', 
        method: this.validateFieldData, 
        args:[{propName:'valid'}],
        validWhen: true, 
        message: 'Invalid emergency contact number'
      },
      {
        field: 'healthCardNo', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Health card number is empty'
      },
      {
        field: 'empNo', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Employee number is empty'
      },
      {
        field: 'joiningDate', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Joining Date is empty'
      },
      {
        field: 'bloodGroup', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Select blood group'
      },
    ]);

    this.state = {
      ...this.getStateData(this.props),
      validation: this.validator.valid(),
      resultData:null
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.update = this.update.bind(this);
    this.fieldData = {};
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
     dataService.getRequest("getEmpDetails", { empId: getCookie("empId") })
      .then(result => {
        // app.userDetails=result.employeeDetails;
        this.setState({
          ...this.getStateData(result.employeeDetails,result.imagePath),
          resultData:result
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  validEmailData(value,args, state, validation,field) {
    const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
    return(validEmailRegex.test(value));
  }

  validateFieldData(value,args, state, validation,field){
    return this.fieldData[field] && !!this.fieldData[field][args.propName];
  }

  handleInputChange(event, fieldData = {}) {
    let field = fieldData.field || event.target.name;
    let value = fieldData.value || event.target.value || "";
    this.fieldData[field] = fieldData;
    event && this.setState({
        [field]: event.target.type == "checkbox" ? event.target.checked : value
    });
  }

  getStateData(empdata,imageData) {
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
      joiningDate: empdata.joiningDate || "",
      bloodGroup: empdata.bloodGroup || "",
      image: imageData || ""
    };
  }

  update() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      dataService.putRequest("updateEmployee", { empId:app.empId , ...this.getStateData(this.state) } )
      .then(res => {
        if(res.status == "success") {
        app.events.trigger(SHOW_ALERT_MSG, {visible: true,type: ALERT_TYPE.SUCESS,msg: "Successfully updated"});
        setTimeout(()=>{
          app.events.trigger(GOTO_URL, { routerKey: PROFILE });},3000)
        }
        else {
          app.events.trigger(SHOW_ALERT_MSG, {visible: true,type: ALERT_TYPE.DANGER,msg: `${res.message}`});
        }
      })
        .catch(err => {console.log(err)});
      }
    }


  render() {
    let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation;
    // let imgPath = this.state.resultData.imagePath;
    return (
      <div className="row" id="content">
        <div className="box-content">
          {/* Image Wrapper */}
          <div className="image-wrapper">
          
          {this.state.image == ''? 
            <img className="image-subwrapper" src={Admin_Logo} />
            :
            <img className="image-subwrapper" src={this.state.image} />
          }
          </div>

          {/* Heading */}
          <p className="greeting">YOUR PROFILE</p>

          <div className="d-flex justify-content-sm-around">
          
            {/* Input details first block  */}
            <div className="col-4">
              <FormField
                label="First Name"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                name="firstName"
                onChange={this.handleInputChange}
                value={this.state.firstName}
                placeholder="First Name"
                validator={validation}
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
                validator={validation}
              />
              <FormField
                label="Email"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                disabled={getCookie("role") !='admin'}
                onChange={this.handleInputChange}
                name="email"
                value={this.state.email}
                placeholder="Email"
                validator={validation}
              />
              <FormField
                label="Designation"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                disabled={getCookie("role") !='admin'}
                mandatory
                onChange={this.handleInputChange}
                name="designation"
                value={this.state.designation}
                placeholder="Designation"
                validator={validation}
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
                validator={validation}
              />
              {/* <FormField
                label="Upload Profile Pic"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                type="file"
                mandatory
                onChange={this.handleInputChange}
                name="image"
                value={this.state.image}
                validator={validation}
              /> */}
            </div>

            {/* Input details second block  */}
            <div className="col-4">
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
                validator={validation}
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
                validator={validation}
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
                validator={validation}
              />
              <FormField
                label="Healthcard Number"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                disabled={getCookie("role") !='admin'}
                onChange={this.handleInputChange}
                name="healthCardNo"
                value={this.state.healthCardNo}
                placeholder="Healthcard Number"
                validator={validation}
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
                validator={validation}
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
                validator={validation}
              />
              <FormField
                label="Joining Date"
                labelClassName="txt-label"
                fieldClassName="txt-input"
                mandatory
                disabled={getCookie("role") !='admin'}
                onChange={this.handleInputChange}
                name="joiningDate"
                type= "date"
                value={this.state.joiningDate}
                placeholder="Joining Date"
                validator={validation} 
              />
            </div>

          </div>
          <div className="d-flex justify-content-center">
              <button type="button" className="btn submit-btn" onClick={this.update}>Update</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
