import React, { Component } from "react";
import { FLIP_LOADER } from "utils/constants";
import Admin_Logo from 'assets/images/Admin.png';
import "assets/sass/pages/_employeeRegister.scss"

class dashboard extends Component {
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
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
          <p className="greeting">Welcome</p>

          <div className="d-flex justify-content-around">
            {/* Employee Id */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">Employee Id</label>
              <input
                className="txt-input readonly-input"
                type="text"
                name="empid"
                value="EMP100"
                readonly
              />
            </div>
            {/* Name */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">Name</label>
              <input
                className="txt-input  readonly-input"
                type="text"
                name="name"
                value="Abc"
                readonly
              />
            </div>
          </div>

          <div className="d-flex justify-content-around">
            {/* Designation */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">Designation</label>
              <input
                className="txt-input  readonly-input"
                type="text"
                name="designation"
                value="Operational"
                readonly
              />
            </div>
            {/* Contact Number */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">Contact Number</label>
              <input
                className="txt-input readonly-input"
                type="text"
                name="contactno"
                value="9756745633"
                readonly
              />
            </div>
          </div>

          <div className="d-flex justify-content-around">
            {/* Email */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">Email</label>
              <input
                type="text"
                className="txt-input readonly-input"
                name="email"
                value="abc@gmail.com"
                readonly
              />
            </div>
             {/*DOB  */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">DOB</label>
              <input
                type="text"
                className="txt-input readonly-input"
                name="dob"
                value="7-11-2019"
                readonly
              />
            </div>
          </div>

          <div className="d-flex justify-content-around">
            {/* Blood Group */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">Blood Group</label>
              <input
                type="text"
                className="txt-input readonly-input"
                name="bgrp"
                value="B+ve"
                readonly
              />
            </div>
            {/* Health Card Number */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">Health Card Number</label>
              <input
                type="text"
                className="txt-input readonly-input"
                name="hcard"
                value="AH67570K9"
                readonly
              />
            </div>
          </div>

          <div className="d-flex justify-content-around">
            {/* Emergency Contact Person */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">
                Emergency Contact Person
              </label>
              <input
                type="text"
                className="txt-input readonly-input"
                name="econtactperson"
                value="Xyz"
                readonly
              />
            </div>
            {/* Emergency Contact Number */}
            <div className="input-wrapper">
              <label className="txt-label readonly-label">
                Emergency Contact Number
              </label>
              <input
                type="text"
                className="txt-input readonly-input"
                name="econtactno"
                value="8956235672"
                readonly
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default dashboard;
