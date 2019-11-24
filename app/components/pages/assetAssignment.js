import React, { Component } from "react";
import {
  FLIP_LOADER,
  GOTO_URL,
  SHOW_ALERT,
  SHOW_ALERT_MSG,
  ALERT_TYPE,
  ASSET_LISTING
} from "utils/constants";
import FormField from "../common/formfield";
import dataService from "utils/dataservice";
import Heading from "../heading";
import FormValidator from '../common/formvalidator';

class assetAssignment extends Component {
  constructor(props) {
    super(props);
    this.validateFieldData = this.validateFieldData.bind(this);
    this.validator = new FormValidator([
      {
        field: 'empNO', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Select employee number'
      },
      {
        field: 'issueDate', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Issue date is empty'
      },
      {
        field: 'returnDate', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Return date is empty'
      },
      {
        field: 'cause', 
        method: 'isEmpty', 
        args:[{ignore_whitespace:true}],
        validWhen: false, 
        message: 'Cause is empty'
      }
    ])
    this.state = {
      ...this.getStateData(this.props),
      validation: this.validator.valid(),
      empData:[],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.cancel = this.cancel.bind(this);
    this.assign = this.assign.bind(this);
    this.unassign = this.unassign.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.fieldData = {};
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    dataService.getRequest("getEmpData")
      .then(result => {
        this.setState({
        ...this.getStateData(result),
        empData: result,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  getStateData(assetdata) {
    return {
      issueDate: assetdata.issueDate || "",
      returnDate: assetdata.returnDate || "",
      // cause: assetdata.cause || "",
    };
  }

  getOptions() {
    let optionData=[];
    optionData= this.state.empData.map(item => ({value:item.empNo,label:item.firstName}));
    return optionData;
    // console.log(empData);
  }

  validateFieldData(value,args, state, validation,field){
    return this.fieldData[field] && !!this.fieldData[field][args.propName];
  }

  assign() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    // empNo: {field: "empNo", value: "INT002", id: "empNo1574532703726", label: "Tands", key: "INT002"}
    
    var empNo = this.fieldData.empNo.value;
    var employee={empNo:empNo};
    var issueDate= this.state.issueDate;
    var updatedId=1;
    var postAsset = {employee:employee,issueDate:issueDate,updatedId:updatedId}

    if (validation.isValid) {
      dataService.postRequest("assetassignment", {postAsset})
      .then(res => {
        if(res.status == "success") {
        app.events.trigger(SHOW_ALERT_MSG, {
          visible: true,
          type: ALERT_TYPE.SUCESS,
          msg: "Successfully Assigned"
        });
        }
      })
      .catch(err => {
        app.events.trigger(SHOW_ALERT_MSG, {
          visible: true,
          type: ALERT_TYPE.DANGER,
          msg: "Failed To Assign"
        });
      });
    }
  }

  unassign() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var returnDate = this.state.returnDate;
    var cause = this.state.cause;
    var updatedId = 1;
    var putAsset = {returnDate:returnDate,cause:cause,updatedId:updatedId}

    if (validation.isValid) {
    dataService
      .putRequest("assetassignment",{putAsset})
      .then(res => {
        if(res.status == "success") {
        app.events.trigger(SHOW_ALERT_MSG, {
          visible: true,
          type: ALERT_TYPE.SUCESS,
          msg: "Unassigned Assets Successfully"
        });
      }
      })
      .catch(err => {
        app.events.trigger(SHOW_ALERT_MSG, {
          visible: true,
          type: ALERT_TYPE.DANGER,
          msg: "Failed To Unassign"
        });
      });
    }
  }

  cancel() {
    app.events.trigger(GOTO_URL, { routerKey: ASSET_LISTING });
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

  render() {
    let validation = this.submitted ?this.validator.validate(this.state) : this.state.validation;
    var status = this.props.match.params.status;
    return (
      <React.Fragment>
        <div className="form-wrapper">
          {status == "Unassigned" ? (
            <Heading heading="ASSIGN ASSET" />
          ) : (
            <Heading heading="UNASSIGN ASSET" />
          )}
          {this.state.empData && status == "Unassigned" ? (
            <div className="d-flex justify-content-sm-around">
              {/* Input details first block  */}
              <div className="p-2 w-25 mt-5">
                <FormField
                  type="select"
                  label="Employee Number"
                  labelClassName="txt-label"
                  fieldClassName="select-input"
                  mandatory
                  name="empNo"
                  nameAlias={"abc_fullName"}
                  onChange={this.handleInputChange}
                  options={this.getOptions()}
                  value={this.state.empNo}
                  placeholder="Employee Number"
                  validator={validation}
                />
                <FormField
                  label="Issue Date"
                  labelClassName="txt-label"
                  fieldClassName="txt-input"
                  mandatory
                  onChange={this.handleInputChange}
                  name="issueDate"
                  type="date"
                  value={this.state.issueDate}
                  placeholder="Issue Date"
                  validator={validation}
                />
              </div>
            </div>
          ) : (this.state.empData && status == "Assigned" &&
            <div className="d-flex justify-content-sm-around">
              {/* Input details first block  */}
              <div className="p-2 w-25 mt-5">
                <FormField
                  label="Return Date"
                  labelClassName="txt-label"
                  fieldClassName="txt-input"
                  mandatory
                  onChange={this.handleInputChange}
                  name="returnDate"
                  type="date"
                  value={this.state.returnDate}
                  placeholder="Return Date"
                  validator={validation}
                />
                <FormField
                  type="textarea"
                  label="Cause"
                  labelClassName="txt-label"
                  fieldClassName="txt-input"
                  mandatory
                  name="cause"
                  onChange={this.handleInputChange}
                  value={this.state.cause}
                  placeholder="Cause"
                  validator={validation}
                />
              </div>
            </div>
          )}
          <div className="btn-wrapper">
            <div className="btn-wrapper">
              {status == "Unassigned" ? (
                <button
                  type="button"
                  className="btn submit-btn"
                  onClick={this.assign}
                >
                  Assign
                </button>
              ) : (
                <button
                  type="button"
                  className="btn submit-btn"
                  onClick={this.unassign}
                >
                  Unassign
                </button>
              )}
              <button
                type="button"
                className="btn cancel-btn"
                onClick={this.cancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default assetAssignment;
