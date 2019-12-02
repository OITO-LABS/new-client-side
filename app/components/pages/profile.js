import React, { Component } from "react";
import { FLIP_LOADER } from "utils/constants";
import Admin_Logo from 'assets/images/Admin.png';
import "assets/sass/pages/_employeeRegister.scss";
import dataService from 'utils/dataservice';

class Profile extends Component {

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
    }
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    dataService.getRequest("getEmpDetails",{ empId:app.empId })  
      .then(res => {
        this.setState({
          data: res
        });
      })
      .catch(error => {
        console.log(error);
    });
  }

  render() {
    var empFields = this.state.employeeFields;
    var empData = this.state.data||[];
    return (
      <div className="row" id="content">
        <div className="box-content">
          {/* Image Wrapper */}
          <div className="image-wrapper">
            <img className="image-subwrapper" src={Admin_Logo} />
          </div>

          {/* Heading */}
          <p className="greeting">YOUR PROFILE</p>

          <div className="d-flex justify-content-around">
            {empFields.map((field,index) => {
              if (index % 2 === 0) {
                <div className="input-wrapper" key={index}>
                  <label className="txt-label text-uppercase readonly-label">{empFields.label}</label>
                  <input className="txt-input readonly-input" type="text" value={empData[field.key]} readonly/>
                </div>
              }
            })}
          </div>

          <div className="d-flex justify-content-around">
            {empFields.map((field,index) => {
              if (index % 2 === 1) {
                <div className="input-wrapper" key={index}>
                  <label className="txt-label text-uppercase readonly-label">{empFields.label}</label>
                  <input className="txt-input readonly-input" type="text" value={empData[field.key]} readonly/>
                </div>
              }
            })}
          </div>
        
        </div>
      </div>
    );
  }
}

export default Profile;
