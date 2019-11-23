import React, { Component } from "react";
import {
  FLIP_LOADER,
  GOTO_URL,
  SHOW_ALERT,
  SHOW_ALERT_MSG,
  ALERT_TYPE
} from "utils/constants";
import FormField from "../common/formfield";
import dataService from "utils/dataservice";
// import FormValidator from '../common/formvalidator';
import "assets/sass/pages/_employeeRegister.scss";

class reimbursementApply extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // ...this.getStateData(this.props)
      reimbursementDetails:[{ index: Math.random(),billDate:"",reimbursementDescription:"",categoryName:"",billNo:"",cost:"" }],
      empNo:"",
      date:"",
      empData:[]
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.fieldData = {};
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    dataService.getRequest("getEmpData")
      .then(result =>{
        this.setState({
          empData: result,
        })
      })
      .catch(error =>{
        console.log(error);
      });  
  }

  getOptions() {
    let optionData=[];
    optionData= this.state.empData.map(item => ({value:item.empNo,label:item.firstName}));
    return optionData;
  }

  handleInputChange() {
    
  }

  // getStateData(reimburseData) {
  //   return {
  //     empNo:reimburseData.empNo || "",
  //     reimbursementDate: reimburseData.reimbursementDate || "",
  //     totalCost: reimburseData.totalCost || "",
  //     billDate: reimburseData.billDate || "",
  //     reimbursementDescription: reimburseData.reimbursementDescription || "",
  //     categoryName: reimburseData.categoryName || "",
  //     billNo: reimburseData.billNo || "",
  //     cost: reimburseData.cost || ""
  //   };
  // }

  // handleInputChange(event, fieldData = {}) {
  //   let field = fieldData.field || event.target.name;
  //   let value = fieldData.value || event.target.value || "";
  //   this.fieldData[field] = fieldData;
  //   event &&
  //     this.setState({
  //       [field]: event.target.type == "checkbox" ? event.target.checked : value
  //     });
  // }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="container mt-3">
            <div className="row mt-5">
              <div className="d-flex mb-4 flex-row mx-auto">
                <div className="mr-2">
                  <FormField
                    type="select"
                    label="Employee Id"
                    labelClassName="txt-label"
                    fieldClassName="select-input"
                    mandatory
                    name="empNo"
                    nameAlias={"abc_fullName"}
                    onChange={this.handleInputChange}
                    options={this.getOptions()}
                    value={this.state.empNo}
                    placeholder="Empoyee Number"
                    // validator={validation}
                  />
                </div>
                <div>
                  <FormField
                    label="Reimbursement Date"
                    labelClassName="txt-label"
                    fieldClassName="txt-input"
                    mandatory
                    onChange={this.handleInputChange}
                    name="reimbursementDate"
                    type="date"
                    value={this.state.reimbursementDate}
                    placeholder="reimbursementDate"
                    // validator={validation}
                  />
                </div>
              </div>
            </div>

            <div className="row personal-assets mt-5">
              <table className="table single-asset input-style">
                <thead>
                  <tr>
                    <th>Bill Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Bill Number</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <FormField
                        labelClassName="txt-label"
                        fieldClassName="txt-input"
                        mandatory
                        onChange={this.handleInputChange}
                        name="billDate"
                        type="date"
                        value={this.state.billDate}
                        placeholder="Bill Date"
                        // validator={validation}
                      />
                    </td>
                    <td>
                      <FormField
                        labelClassName="txt-label"
                        fieldClassName="txt-input"
                        mandatory
                        onChange={this.handleInputChange}
                        name="reimbursementDescription"
                        value={this.state.reimbursementDescription}
                        placeholder="Reimbursement Description"
                        // validator={validation}
                      />
                    </td>
                    <td>
                      <FormField
                        labelClassName="txt-label"
                        fieldClassName="txt-input"
                        mandatory
                        onChange={this.handleInputChange}
                        name="categoryName"
                        value={this.state.categoryName}
                        placeholder="Category Name"
                        // validator={validation}
                      />
                    </td>
                    <td>
                      <FormField
                        labelClassName="txt-label"
                        fieldClassName="txt-input"
                        mandatory
                        onChange={this.handleInputChange}
                        name="billNo"
                        value={this.state.billNo}
                        placeholder="Bill Number"
                        // validator={validation}
                      />
                    </td>
                    <td>
                      <FormField
                        labelClassName="txt-label"
                        fieldClassName="txt-input"
                        mandatory
                        onChange={this.handleInputChange}
                        name="cost"
                        value={this.state.cost}
                        placeholder="Cost"
                        // validator={validation}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <label className="txt-label d-flex justify-content-center">
                        Total
                      </label>
                    </td>
                    <td>
                      <label className="txt-label d-flex">Rs.</label>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mx-auto">
                <button className="submit-btn">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default reimbursementApply;
