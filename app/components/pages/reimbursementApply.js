import React, { Component } from "react";
import {FLIP_LOADER,GOTO_URL,SHOW_ALERT,SHOW_ALERT_MSG,ALERT_TYPE} from "utils/constants";
import FormField from "../common/formfield";
import FormValidator from "../common/formvalidator";
import dataService from "utils/dataservice";
import "assets/sass/pages/_employeeRegister.scss";

class ReimbursementApply extends Component {
  constructor(props) {
    super(props);
    this.validateFieldData = this.validateFieldData.bind(this);
    this.validator = new FormValidator([
      {
        field: "empNo",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Select employee number"
      },
      {
        field: "reimbursementDate",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Reimbursement date is empty"
      },
      {
        field: "billDate",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Reimbursement date is empty"
      },
      {
        field: "reimbursementDescription",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Reimbursement description is empty"
      },
      {
        field: "categoryName",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Category name description is empty"
      },
      {
        field: "billNo",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Bill number is empty"
      },
      {
        field: "cost",
        method: "isEmpty",
        args: [{ ignore_whitespace: true }],
        validWhen: false,
        message: "Cost is empty"
      },
    
    ]);
    this.state = {
      reimbursementDetails: [
        {
          index: 1,
          billDate: "",
          reimbursementDescription: "",
          categoryName: "",
          billNo: "",
          cost: 0,
          flag: false
        }
      ],
      empNo: "",
      empData: [],
      validation: this.validator.valid()
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getOptions = this.getOptions.bind(this);
    this.fieldData = {};
    this.handleInputChange2 = this.handleInputChange2.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.subTotal = this.subTotal.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    dataService
      .getRequest("getEmpData")
      .then(result => {
        this.setState({
          empData: result
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getOptions() {
    let optionData = [];
    optionData = this.state.empData.map(item => ({value: item.empNo,label: item.firstName}));
    return optionData;
  }

  handleInputChange2(event, fieldData) {
    let field = fieldData.field || event.target.name;
    let value = fieldData.value || event.target.value || "";
    let index = fieldData.index;
    console.log(index);
    let reimbursementDetails = this.state.reimbursementDetails;
    let filteredRow = reimbursementDetails.find(detail => {
      return detail.index == index;
    });
    console.log(filteredRow);
    filteredRow[field] = value;
    // if (filteredRow.flag == false) {
    //   filteredRow.flag = true
    //   reimbursementDetails.push();
    // }
    this.setState(filteredRow);
    this.subTotal();
  }

  handleAdd() {
    let add = [...this.state.reimbursementDetails];
    add.push({ index: Math.random(), billDate: "", reimbursementDescription: "", categoryName: "", billNo: "", cost: 0, flag: false });
    this.setState({
      reimbursementDetails: add
    });
  }

  handleInputChange(event, fieldData={}) {
    let field = fieldData.field || event.target.name;
    let value = fieldData.value || event.target.value || "";
    this.fieldData[field] = fieldData;
    event &&
      this.setState({
        [field]: event.target.type == "checkbox" ? event.target.checked : value
      });
  }

  subTotal() {
    let total = 0;
    this.state.reimbursementDetails.forEach(row => {
      if(row.cost!=""){
        total = total + parseInt(row.cost);
      }
    });
    this.setState({
      totalCost: total
    });
  }

  onSubmit() {
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;
    var empNo = this.state.empNo;
    var reimbursementDate = this.state.reimbursementDate;
    var totalCost = this.state.totalCost;
    var reimbursementDetails = this.state.reimbursementDetails;

    if (validation.isValid) {
      dataService
        .postRequest("reimbursementApply", {empNo: empNo,reimbursementDate: reimbursementDate,totalCost: totalCost,reimbursementDetails: reimbursementDetails})
        .then(res => {
          if (res.status == "success") {
            app.events.trigger(SHOW_ALERT_MSG, {visible: true,type: ALERT_TYPE.SUCESS,msg: "Successfully Submitted"});
            setTimeout(()=>{
              app.events.trigger(GOTO_URL, { routerKey: REIMBURSEMENT_LISTING });
            },3000)
          } else {
            app.events.trigger(SHOW_ALERT_MSG, {visible: true,type: ALERT_TYPE.DANGER,msg: `${res.message}`});
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  getStateData(reimburseData) {
    return {
      billDate: reimburseData.billDate || "",
      // totalCost: reimburseData.totalCost || "",
      billDate: reimburseData.billDate || "",
      reimbursementDescription: reimburseData.reimbursementDescription || "",
      categoryName: reimburseData.categoryName || "",
      billNo: reimburseData.billNo || "",
      cost: reimburseData.cost || ""
    };
  }

  validateFieldData(value, args, state, validation, field) {
    return this.fieldData[field] && !!this.fieldData[field][args.propName];
  }

  handleInputChange1(row) {
    console.log(row);
  }
  handleDelete(row) {
    let filteredData = this.state.reimbursementDetails.filter(data => {
      return data.index != row.index;
    });
    if (filteredData.length >= 1) {
      this.setState(
        {
          reimbursementDetails: filteredData
        },
        () => {
          this.subTotal();
        }
      );
    }
  }

  render() {
    let validation = this.submitted
      ? this.validator.validate(this.state)
      : this.state.validation;
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="container mt-3">
            <div className="row mt-5">
              <div className="d-flex mb-4 flex-row mx-auto">
                <div className="mr-2">
                  <FormField
                    type="select"
                    searchable
                    label="Employee Name"
                    labelClassName="txt-label"
                    fieldClassName="select-input"
                    mandatory
                    name="empNo"
                    nameAlias={"empNo"}
                    onChange={this.handleInputChange}
                    options={this.getOptions()}
                    value={this.state.empNo}
                    placeholder="Employee Name"
                    validator={validation}
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
                    validator={validation}
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
                  {this.state.reimbursementDetails.map(detail => {
                    return (
                      <tr>
                        <td>
                          <FormField
                            labelClassName="txt-label"
                            fieldClassName="txt-input"
                            mandatory
                            onChange={() =>
                              this.handleInputChange2(event, detail)
                            }
                            name="billDate"
                            type="date"
                            value={detail.billDate}
                            placeholder="Bill Date"
                            validator={validation}
                          />
                        </td>
                        <td>
                          <FormField
                            labelClassName="txt-label"
                            fieldClassName="txt-input"
                            mandatory
                            onChange={() =>
                              this.handleInputChange2(event, detail)
                            }
                            name="reimbursementDescription"
                            value={detail.reimbursementDescription}
                            placeholder="Reimbursement Description"
                            validator={validation}
                          />
                        </td>
                        <td>
                        <FormField
                          type="select"
                          searchable
                          labelClassName="txt-label"
                          fieldClassName="select-input"
                          mandatory
                          name="categoryName"
                          nameAlias={"categoryName"}
                          onChange = {this.handleInputChange}
                          // onChange={() =>
                          //     this.handleInputChange2(event, detail)
                          // }
                          options={[
                            { value: "Business Meals", label: "Business Meals" },
                            { value: "Legal Fees", label: "Legal Fees" },
                            { value: "Dues ", label: "Dues" },
                            { value: "Business Cards", label: "Business Cards" },
                            { value: "License Fees", label: "License Fees" },
                            { value: "Mileage", label: "Mileage" },
                            { value: "Office Supplies", label: "Office Supplies" },
                            { value: "Passport fee", label: "Passport fee" },
                            { value: "Postage", label: "Postage" },
                            { value: "Printer Cartridges", label: "Printer Cartridges" },
                            { value: "Printer Paper", label: "Printer Paper" },
                            { value: "Software", label: "Software" },
                            { value: "Stationery", label: "Stationery" },
                            { value: "Subscriptions", label: "Subscriptions" },
                            { value: "Telephones", label: "Telephones" },
                            { value: "Tools", label: "Tools" },
                            { value: "Training Fees", label: "Training Fees" },
                            { value: "Travel", label: "Travel" },
                            { value: "Others", label: "Others" }
    
                          ]}
                            value={this.state.categoryName}
                            placeholder="Category Name"
                            validator={validation}
                          />
                          {/* <FormField
                            labelClassName="txt-label"
                            fieldClassName="txt-input"
                            mandatory
                            onChange={() =>
                              this.handleInputChange2(event, detail)
                            }
                            name="categoryName"
                            value={detail.categoryName}
                            placeholder="Category Name"
                            validator={validation}
                          /> */}
                        </td>
                        <td>
                          <FormField
                            labelClassName="txt-label"
                            fieldClassName="txt-input"
                            mandatory
                            onChange={() =>
                              this.handleInputChange2(event, detail)
                            }
                            name="billNo"
                            value={detail.billNo}
                            placeholder="Bill Number"
                            validator={validation}
                          />
                        </td>
                        <td>
                          <FormField
                            labelClassName="txt-label"
                            fieldClassName="txt-input"
                            mandatory
                            onChange={() =>
                              this.handleInputChange2(event, detail)
                            }
                            name="cost"
                            value={detail.cost}
                            placeholder="Cost"
                            type="number"
                            validator={validation}
                          />
                        </td>
                        <td>
                          <button
                            className="btn btn-success"
                            onClick={this.handleAdd}
                          >
                            <i class="fas fa-plus"></i>
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              this.handleDelete(detail);
                            }}
                          >
                            <i class="fas fa-minus"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}

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
                      <label className="txt-label d-flex">
                        Rs.{this.state.totalCost}
                      </label>
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mx-auto">
                <button className="submit-btn" onClick={this.onSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ReimbursementApply;
