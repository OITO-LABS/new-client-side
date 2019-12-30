import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, REIMBURSEMENT_BILL_LISTING, SHOW_ALERT, SHOW_ALERT_MSG, ALERT_TYPE } from 'utils/constants';
import dataService from 'utils/dataservice';
import ListTable from "../listTable";
import "assets/sass/pages/_listing.scss";
import FormField from "../common/formfield";
import { confirm } from 'utils/common';
import { getCookie, setCookie, removeCookie } from "utils/cookie";



export class ReimbursementBillListing extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fields: [
        { label: "si no", key: "index" },
        { label: "Bill no", key: "billNo" },
        { label: "bill date", key: "billDate" },
        { label: "description", key: "reimbursementDescription" },
        { label: "category name", key: "categoryName" },
        { label: "cost", key: "cost" },
        { label: "status", key: "billStatus" },
        { label: "action", key: "action" },
      ],
      datas: [
      ],
      subtotal: 0
    }
    this.pageHandler = this.pageHandler.bind(this);
    this.gettingBill = this.gettingBill.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingBill();
  }

  pageHandler(data) {
    console.log(data);
  }

  gettingBill() {
    let role = getCookie('role');
    dataService.getRequest("reimbursementBill", { reimbursementId: this.props.match.params.reimbursementId, role:role })
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

  async handleDelete(data) {
    console.log(data);
    let isConfirmed = false;
    isConfirmed = await confirm({
      msg: 'Are you sure you want to delete this record?',
    });
    if (isConfirmed) {
      dataService.putRequest("urlKey", { empNo: data.empNo })
        .then(res => {
          if (res.status == "success") {
            app.events.trigger(SHOW_ALERT_MSG, {
              visible: true,
              type: ALERT_TYPE.SUCESS,
              msg: "Successfully Deleted"
            });
            this.gettingBill();
          }
          else {
            app.events.trigger(SHOW_ALERT_MSG, {
              visible: true,
              type: ALERT_TYPE.DANGER,
              msg: ` Deletion Failed  ${res.message}`
            });
            this.gettingBill();
          }
        }).catch(res => {
          console.log(res);
        });
    }
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
        {getCookie("role") == "admin" ?
          <ListTable
            fields={this.state.fields}
            datas={this.state.datas}
            pageHandler={this.handlePage}
            deleteHandler={this.handleDelete} />
          : ""}

        <div className="row total-cost">
          <div className="col-8"></div>
          <div className="col-4 total table-wrap">
            <table className="table table-bordered text-center">
              <tbody>
                <tr>
                  <td>Total Cost</td>
                  <td className="num text-right">{this.state.subtotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex flex-row-reverse">
          <button className="ml-auto btn btn-success" onClick={() => window.print()}>PRINT</button>
        </div>
        {/* <div class="btn-wrapper">
          <div class="btn-wrapper">
            <button type="button" class="btn btn-primary">Edit</button>
            <button type="button" class="btn btn-success">send for approvel</button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default ReimbursementBillListing;
