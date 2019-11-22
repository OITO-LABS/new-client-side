import React, { Component } from 'react';
import { FLIP_LOADER, GOTO_URL, REIMBURSEMENT_BILL_LISTING } from 'utils/constants';
import dataService from 'utils/dataservice';
import ListTable from "../listTable";
import "assets/sass/pages/_listing.scss";
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
      // datas: [
      //   {
      //     "billDate": "2019-11-11T18:30:00.000+0000",
      //     "reimbursementDescription": "Travel Expense",
      //     "categoryName": "Travel",
      //     "billNo": 14351,
      //     "cost": 16000
      //   },
      //   {
      //     "billDate": "2019-11-12T18:30:00.000+0000",
      //     "reimbursementDescription": "Food Expense",
      //     "categoryName": "Food",
      //     "billNo": 3042253,
      //     "cost": 2000
      //   }
      // ]
    }
    this.pageHandler = this.pageHandler.bind(this);
    this.totalCost = this.totalCost.bind(this);
    this.gettingBill = this.gettingBill.bind(this);

  }
  componentDidMount() {
    app.events.trigger(FLIP_LOADER, { status: false, reset: true });
    this.gettingBill();
    this.totalCost();

  }
  pageHandler(data) {
    console.log(data);
  }

  gettingBill() {
    dataService.getRequest("reimbursementBill", { reimbursementId: this.props.match.params.reimbursementId })
      .then(res => {
        this.setState({
          datas: res.billDetails,
          empName:res.empName,
          empNo:res.empNo,
          empDesignation:res.empDesignation
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  totalCost() {
    let totalCost = 0;
    this.state.datas.map((data) => {
      totalCost = totalCost + data.cost;
    })
    this.setState({
      totalCost: totalCost
    })
  }

  render() {
    return (
      <div>
        <ListTable
          fields={this.state.fields}
          datas={this.state.datas}
          pageHandler={this.handlePage}
        />
        <div className="row total-cost">
          <div className="col-9"></div>
          <div className="col-3 total">
            <table className="table ">
              <tbody>
                <td>Total Cost</td>
                <td className="num">1200</td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ReimbursementBillListing;
