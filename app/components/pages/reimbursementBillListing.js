import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, REIMBURSEMENT_BILL_LISTING } from 'utils/constants';
import dataService from 'utils/dataservice';
import ListTable from "../listTable";
import "assets/sass/pages/_listing.scss";
import FormField from "../common/formfield";

export class ReimbursementBillListing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: [
        { label: "si no", key: "index" },
        { label: "Bill no", key: "billNo" },
        { label: "bill date", key: "billDate" },
        { label: "reimbursement description", key: "reimbursementDescription" },
        { label: "category name", key: "categoryName" },
        { label: "cost", key: "cost" },
      ],
      datas: [
        // {
        //   "billDate": "2019-11-11T18:30:00.000+0000",
        //   "reimbursementDescription": "Travel Expense",
        //   "categoryName": "Travel",
        //   "billNo": 14351,
        //   "cost": 16000
        // },
        // {
        //   "billDate": "2019-11-12T18:30:00.000+0000",
        //   "reimbursementDescription": "Food Expense",
        //   "categoryName": "Food",
        //   "billNo": 3042253,
        //   "cost": 2000
        // }
      ],
      subtotal: 0
    }
    this.pageHandler = this.pageHandler.bind(this);
    this.gettingBill = this.gettingBill.bind(this);

  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingBill();
  }

  pageHandler(data) {
    console.log(data);
  }

  gettingBill() {
    dataService.getRequest("reimbursementBill", { reimbursementId: this.props.match.params.reimbursementId })
      .then(res => {
        this.setState({
          datas: res.billDetails,
          empName: res.empName,
          empNo: res.empNo,
          empDesignation: res.empDesignation,
          subtotal: res.totalCost
        });
      })
      .catch(error => {
        console.log(error);
      });
  }



  render() {
    return (
      <div>
        <div className="row">
          <div className="col-4">
            <div className="d-flex justify-content-sm-around">
              <div className="p-2 w-75 mt-5">
                <FormField
                  label="Employee No"
                  labelClassName="txt-label"
                  fieldClassName="txt-input"
                  name="assetKey"
                  value={this.state.empNo}
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-sm-around">
              <div className="p-2 w-75 mt-5">
                <FormField
                  label="Employee Name"
                  labelClassName="txt-label"
                  fieldClassName="txt-input"
                  name="assetKey"
                  value={this.state.empName}
                />
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="d-flex justify-content-sm-around">
              {/* Input details first block  */}
              <div className="p-2 w-75 mt-5">
                <FormField
                  label="Designation"
                  labelClassName="txt-label"
                  fieldClassName="txt-input"
                  name="assetKey"
                  value={this.state.empDesignation}
                />
              </div>
            </div>
          </div>
        </div>

        <ListTable
          fields={this.state.fields}
          datas={this.state.datas}
          pageHandler={this.handlePage}
        />

        <div className="row total-cost">
          <div className="col-8"></div>
          <div className="col-4 total table-wrap">
            <table className="table table-bordered ">
              <tbody>
                <tr>
                  <td>Total Cost</td>
                  <td className="num">{this.state.subtotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-row-reverse">
          <button className="ml-auto btn btn-success" onClick={() => window.print()}>PRINT</button>
        </div>
      </div>
    );
  }
}

export default ReimbursementBillListing;
